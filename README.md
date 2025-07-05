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
   ```

3. **Development:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Sanity Schema

Your Sanity project should have these document types:

### Recipe Document (`recipe`)
- `title` (string)
- `slug` (slug)
- `excerpt` (text)
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
- `image` (image)
- `bio` (text)

### Category Document (`category`)
- `title` (string)
- `slug` (slug)
- `description` (text)
- `image` (image)

### Site Settings Document (`siteSettings`) - Optional
- `title` (string)
- `description` (text)
- `keywords` (array of strings)
- `socialMedia` (object)
- `logo` (image)

## Deployment

### Cloudflare Pages

1. Connect your Git repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `dist`
4. Add environment variables in Cloudflare Pages dashboard:
   - `SANITY_PROJECT_ID`
   - `SANITY_DATASET`
   - `SANITY_TOKEN`

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