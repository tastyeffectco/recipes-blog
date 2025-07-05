# Asset Management System

This project uses an automated asset management system that downloads logo and favicon images from Sanity CMS and places them in the correct locations in your project.

## How It Works

### 1. Sanity Site Settings Schema

The site settings in Sanity include two important image fields:

```typescript
{
  name: 'logo',
  title: 'Logo',
  type: 'image',
  options: {
    hotspot: true,
  },
},
{
  name: 'favicon',
  title: 'Favicon',
  type: 'image',
  description: 'Small icon for browser tabs and bookmarks',
}
```

### 2. Asset Download Script

The `scripts/download-assets.js` script:

- Fetches site settings from Sanity CMS
- Downloads the logo image and saves it as `public/assets/drawable/logo.svg`
- Downloads the favicon image and saves it as `public/favicon.svg`
- Creates necessary directories if they don't exist
- Provides graceful fallbacks if Sanity is not configured

### 3. Automatic Execution

The script runs automatically:

- **Before every build**: Via the `prebuild` script in package.json
- **Manual execution**: Using `npm run download-assets`

## File Locations

| Asset | Sanity Field | Local Path | Usage |
|-------|--------------|------------|-------|
| Logo | `siteSettings.logo` | `public/assets/drawable/logo.svg` | Header branding, JSON-LD |
| Favicon | `siteSettings.favicon` | `public/favicon.svg` | Browser icon, meta tags |

## Development Workflow

### With Sanity Configured

1. Upload logo and favicon images to Sanity site settings
2. Set `published: true` in site settings
3. Run `npm run build` or `npm run download-assets`
4. Assets are automatically downloaded and replaced

### Without Sanity Configured

1. Place your logo file at `public/assets/drawable/logo.svg`
2. Place your favicon file at `public/favicon.svg`
3. The system uses these static files as fallbacks

## Environment Variables

The script uses these environment variables (in order of preference):

- `SANITY_PROJECT_ID` or `PUBLIC_SANITY_PROJECT_ID`
- `SANITY_DATASET` or `PUBLIC_SANITY_DATASET` (defaults to 'production')
- `SANITY_TOKEN` or `PUBLIC_SANITY_TOKEN` (optional for public data)

## Error Handling

The script includes robust error handling:

- **No Sanity config**: Uses existing static assets
- **No published site settings**: Uses existing static assets
- **Download failures**: Logs errors but doesn't stop the build
- **Missing images**: Gracefully skips missing assets

## Manual Asset Management

If you prefer manual control:

1. Remove the `prebuild` script from package.json
2. Manually place assets in the correct locations
3. The system will use your static files

## Supported Image Formats

The script supports any image format that Sanity accepts:
- SVG (recommended for logos and favicons)
- PNG
- JPG/JPEG
- WebP

Note: The script preserves the original format from Sanity.

## Troubleshooting

### Assets not updating

1. Check if site settings are published in Sanity
2. Verify environment variables are set correctly
3. Run `npm run download-assets` manually to see error messages
4. Check file permissions in the public directory

### Build fails

1. The script includes fallbacks to prevent build failures
2. Check the console output for specific error messages
3. Ensure the `scripts` directory and `download-assets.js` file exist

### Wrong image displayed

1. Clear your browser cache
2. Verify the correct files exist in the public directory
3. Check that the image URLs in Sanity are accessible 