import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get environment variables
const projectId = "lxetvc5g";
const dataset = process.env.SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production';

console.log('🔄 Starting comprehensive asset download process...');
console.log(`📋 Project ID: ${projectId ? '✅ Found' : '❌ Missing'}`);
console.log(`📋 Dataset: ${dataset}`);

if (!projectId) {
  console.log('❌ No Sanity project ID found. Please check your .env file.');
  console.log('💡 Required: SANITY_PROJECT_ID=your-project-id');
  process.exit(0);
}

// Create Sanity client
const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2023-11-01'
});

// Helper function to get image URL from Sanity asset
const getImageUrl = (image) => {
  if (!image || !image.asset) {
    return null;
  }
  
  // If we have the asset URL directly (from expanded query)
  if (image.asset.url) {
    return image.asset.url;
  }
  
  // If we have an asset reference
  if (image.asset._ref) {
    const ref = image.asset._ref;
    try {
      const [, id, dimensions, originalFormat] = ref.match(/^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/);
      const url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${originalFormat}`;
      return url;
    } catch (error) {
      console.log(`❌ Failed to parse asset reference: ${error.message}`);
      return null;
    }
  }
  
  // If we have asset ID (from expanded query)
  if (image.asset._id) {
    const url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${image.asset._id}`;
    return url;
  }
  
  return null;
};

// Helper function to get asset ID from image
const getAssetId = (image) => {
  if (!image || !image.asset) {
    return null;
  }
  
  // If we have asset ID directly
  if (image.asset._id) {
    return image.asset._id;
  }
  
  // If we have an asset reference
  if (image.asset._ref) {
    const ref = image.asset._ref;
    try {
      const [, id] = ref.match(/^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/);
      return `image-${id}`;
    } catch (error) {
      console.log(`❌ Failed to parse asset reference for ID: ${error.message}`);
      return null;
    }
  }
  
  return null;
};

// Helper function to download file
const downloadFile = (url, filepath) => {
  return new Promise((resolve, reject) => {
    console.log(`📥 Downloading: ${url}`);
    
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Saved: ${filepath}`);
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file on error
      reject(err);
    });
  });
};

// Helper function to ensure directory exists
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
};

// Helper function to extract images from document
const extractImages = (doc, images = new Set()) => {
  if (!doc || typeof doc !== 'object') return images;
  
  for (const [key, value] of Object.entries(doc)) {
    if (key === 'asset' && value && (value._ref || value._id)) {
      // This is an image asset
      const parentImage = { asset: value };
      const assetId = getAssetId(parentImage);
      const imageUrl = getImageUrl(parentImage);
      
      if (assetId && imageUrl) {
        images.add({ id: assetId, url: imageUrl });
      }
    } else if (Array.isArray(value)) {
      // Recursively check arrays
      value.forEach(item => extractImages(item, images));
    } else if (value && typeof value === 'object') {
      // Recursively check objects
      extractImages(value, images);
    }
  }
  
  return images;
};

// Main function to download assets
async function downloadAssets() {
  try {
    console.log('🔍 Fetching site settings from Sanity...');
    
    // Define paths
    const publicDir = path.join(__dirname, '..', 'public');
    const assetsDir = path.join(publicDir, 'assets', 'drawable');
    const imagesDir = path.join(publicDir, 'assets', 'images');
    
    // Ensure directories exist
    ensureDir(assetsDir);
    ensureDir(imagesDir);
    
    const downloads = [];
    
    // Download site settings assets (logo, favicon)
    console.log('📋 Processing site settings...');
    const siteSettings = await client.fetch(`
      *[_type == "siteSettings" && published == true][0] {
        siteName,
        logo{
          asset->{
            _id,
            url,
            originalFilename
          }
        },
        favicon{
          asset->{
            _id,
            url,
            originalFilename
          }
        }
      }
    `);

    if (siteSettings) {
      console.log(`✅ Found site settings for: ${siteSettings.siteName}`);
      
      // Download logo
      if (siteSettings.logo) {
        const logoUrl = getImageUrl(siteSettings.logo);
        if (logoUrl) {
          const logoPath = path.join(assetsDir, 'logo.svg');
          downloads.push(downloadFile(logoUrl, logoPath));
        }
      }
      
      // Download favicon
      if (siteSettings.favicon) {
        const faviconUrl = getImageUrl(siteSettings.favicon);
        if (faviconUrl) {
          let extension = 'png';
          if (faviconUrl.includes('.')) {
            const urlParts = faviconUrl.split('.');
            extension = urlParts[urlParts.length - 1].split('?')[0];
          }
          const faviconPath = path.join(publicDir, `favicon.${extension}`);
          downloads.push(downloadFile(faviconUrl, faviconPath));
        }
      }
    }
    
    // Download all document images
    console.log('🖼️  Processing all document images...');
    
    // Query all documents that might have images
    const allDocuments = await client.fetch(`
      *[_type in ["recipe", "post", "category", "author", "page"]] {
        _id,
        _type,
        title,
        name,
        mainImage{
          asset->{
            _id,
            url
          }
        },
        image{
          asset->{
            _id,
            url
          }
        },
        images[]{
          asset->{
            _id,
            url
          }
        },
        articleContent{
          firstImage{
            asset->{
              _id,
              url
            }
          },
          secondImage{
            asset->{
              _id,
              url
            }
          },
          images[]{
            asset->{
              _id,
              url
            }
          }
        },
        // Add other potential image fields
        heroImage{
          asset->{
            _id,
            url
          }
        },
        gallery[]{
          asset->{
            _id,
            url
          }
        }
      }
    `);
    
    console.log(`📊 Found ${allDocuments.length} documents to process`);
    
    // Collect all unique images
    const allImages = new Set();
    
    allDocuments.forEach(doc => {
      extractImages(doc, allImages);
    });
    
    console.log(`🖼️  Found ${allImages.size} unique images to download`);
    
    // Download all images
    for (const image of allImages) {
      try {
        // Use asset ID as filename with .webp extension
        const filename = `${image.id}.webp`;
        const filepath = path.join(imagesDir, filename);
        
        // Skip if file already exists
        if (fs.existsSync(filepath)) {
          console.log(`⏭️  Skipping existing: ${filename}`);
          continue;
        }
        
        downloads.push(downloadFile(image.url, filepath));
        
        // Add small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.log(`❌ Failed to queue download for ${image.id}: ${error.message}`);
      }
    }
    
    // Wait for all downloads to complete
    if (downloads.length > 0) {
      console.log(`⏳ Downloading ${downloads.length} assets...`);
      await Promise.all(downloads);
      console.log(`🎉 Successfully downloaded ${downloads.length} asset(s)!`);
    } else {
      console.log('⚠️  No new assets to download');
    }

  } catch (error) {
    console.error('❌ Error downloading assets:', error.message);
    console.log('⚠️  Using existing static assets.');
  }
}

// Run the download process
downloadAssets(); 