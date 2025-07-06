# Minimal Astro Recipe Site

A minimal static site generator that pulls recipe content from Sanity.io and generates clean, SEO-optimized HTML pages.

## Features

- 🍴 Recipe pages with ingredients, instructions, tips, and nutrition info
- ⏱️ Recipe meta data (prep time, cook time, servings, difficulty)
- 👤 Author information with avatars and bios
- 🏷️ Category organization and filtering
- 📱 Responsive design with semantic HTML
- 🎨 Clean, custom CSS (no frameworks)
- 🔍 SEO-optimized with Open Graph meta tags
- 📊 Static site generation for fast performance
- 🌐 Ready for Cloudflare Pages deployment
- 🏢 Multi-tenant support with site-specific content filtering
- 🤖 AI-powered recipe generation with Gemini AI

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Sanity.io:**
   Create a `.env` file with your Sanity configuration:
   ```env
   SANITY_PROJECT_ID=your_project_id_here
   SANITY_DATASET=production
   SANITY_TOKEN=your_read_token_here
   SITE_ID=your-site-id
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Development:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Generate recipes with AI (optional):**
   ```bash
   npm run generate-recipe
   ```
   
   Requires `GEMINI_API_KEY` environment variable. See [scripts/README.md](scripts/README.md) for details.

## Multi-Tenant Configuration

This site supports multi-tenant architecture where multiple websites can share the same Sanity dataset while displaying different content based on the `SITE_ID` environment variable.

### How it works:

1. **Site Settings**: Each site has its own `siteSettings` document with a unique `siteId` field
2. **Content Filtering**: All content (recipes, categories, authors) is filtered by the `siteId` reference
3. **Environment Variable**: The `SITE_ID` environment variable determines which site's content to display

### Setting up multi-tenant:

1. **Create site settings** in Sanity with unique `siteId` values:
   ```javascript
   // Example site settings
   {
     _type: 'siteSettings',
     siteId: 'recipes-by-john',
     siteName: 'Recipes by John',
     domain: 'recipesbyjohn.com',
     // ... other settings
   }
   ```

2. **Reference site settings** in your content documents:
   ```javascript
   // Example recipe document
   {
     _type: 'recipe',
     title: 'Chocolate Cake',
     siteId: {
       _type: 'reference',
       _ref: 'siteSettings-document-id'
     },
     // ... other recipe fields
   }
   ```

3. **Set environment variable** for each deployment:
   ```env
   SITE_ID=recipes-by-john
   ```

### Benefits:
- **Shared Infrastructure**: Multiple sites using the same Sanity project
- **Content Isolation**: Each site only displays its own content
- **Easy Management**: Manage multiple recipe sites from one Sanity Studio
- **Cost Effective**: Share Sanity project across multiple sites

## Sanity Schema

Your Sanity project should have these document types:

### Recipe Document (`recipe`)
- `title` (string)
- `slug` (slug)
- `excerpt` (text)
- `siteId` (reference to siteSettings document) - **Required for multi-tenant**
- `mainImage` (image with alt text and caption)
- `prepTime` (number) - in minutes
- `cookTime` (number) - in minutes
- `servings` (number)
- `difficulty` (string) - e.g., "Easy", "Medium", "Hard"
- `ingredients` (array of strings)
- `instructions` (array of strings)
- `tips` (array of strings)
- `nutrition` (object with calories, protein, carbs, fat, fiber, sugar)
- `author` (reference to author document)
- `categories` (array of references to category documents)
- `publishedAt` (datetime)

### Author Document (`author`)
- `name` (string)
- `slug` (slug)
- `siteId` (reference to siteSettings document) - **Required for multi-tenant**
- `image` (image)
- `bio` (text)
- `bio2` (text) - Secondary bio field

### Category Document (`category`)
- `title` (string)
- `slug` (slug)
- `siteId` (reference to siteSettings document) - **Required for multi-tenant**
- `description` (text)
- `image` (image)

### Site Settings Document (`siteSettings`) - **Required for multi-tenant**
- `siteId` (slug) - **Unique identifier for the site**
- `domain` (string)
- `siteName` (string)
- `tagline` (string)
- `logo` (image)
- `favicon` (image)
- `defaultTitle` (string)
- `defaultDescription` (text)
- `ogImage` (image)
- `theme` (object with primaryColor, fontFamily, borderRadius, layoutStyle)
- `socialMedia` (object with facebook, instagram, pinterest, twitter, youtube, email)
- `googleAnalyticsId` (string)
- `published` (boolean)

## Deployment

### Cloudflare Pages

1. Connect your Git repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `dist`
4. Add environment variables in Cloudflare Pages dashboard:
   - `SANITY_PROJECT_ID`
   - `SANITY_DATASET`
   - `SANITY_TOKEN`
   - `SITE_ID`
   - `GEMINI_API_KEY` (optional, for AI recipe generation)

## Project Structure

```
/
├── src/
│   ├── pages/
│   │   ├── index.astro          # Home page with recipe list
│   │   └── recipes/[slug].astro # Dynamic recipe pages
│   ├── components/
│   │   └── RecipeBody.astro     # Recipe content component
│   ├── styles/
│   │   └── main.css             # Custom styling
│   └── lib/
│       └── sanity.js            # Sanity client configuration
├── public/
│   ├── favicon.svg              # Site favicon
│   └── assets/                  # Static assets directory
├── astro.config.mjs             # Astro configuration
└── package.json                 # Dependencies
```

## Output

The site generates clean, static HTML with:
- No client-side JavaScript
- No framework classes or IDs
- Semantic HTML structure
- Proper SEO meta tags
- Responsive images with lazy loading
- Recipe meta badges (prep time, servings, difficulty)
- Nutrition information display
- Author profiles and category organization 