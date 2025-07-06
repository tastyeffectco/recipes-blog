# Recipe Generator Scripts

This directory contains utility scripts for managing content in your Astro recipe site.

## Recipe Generator (`generate-recipe.js`)

An AI-powered script that generates complete recipe content using Google's Gemini AI and publishes it directly to Sanity.

### Features

- 🤖 **AI-Powered Content Generation**: Uses Gemini AI to create comprehensive recipe content
- 📝 **Complete Recipe Structure**: Generates all required fields including ingredients, instructions, tips, FAQs, and nutrition info
- 🏢 **Multi-tenant Support**: Works with the site's multi-tenant architecture
- 🎯 **Interactive Prompts**: Guides you through the recipe creation process
- 📊 **Sanity Integration**: Automatically publishes to your Sanity dataset

### Setup

1. **Install dependencies** (already done if you ran `npm install`):
   ```bash
   npm install @google/generative-ai inquirer slugify
   ```

2. **Set up environment variables** in your `.env` file:
   ```env
   # Sanity Configuration
   SANITY_PROJECT_ID=your-sanity-project-id
   SANITY_DATASET=production
   SANITY_TOKEN=your-sanity-token-with-write-access
   
   # AI Configuration
   GEMINI_API_KEY=your-gemini-api-key
   
   # Multi-tenant Configuration
   SITE_ID=your-site-id
   ```

3. **Get a Gemini API key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file

### Usage

Run the script using npm:
```bash
npm run generate-recipe
```

Or directly with Node.js:
```bash
node scripts/generate-recipe.js
```

### Interactive Process

The script will guide you through:

1. **Recipe Title**: Enter the name of your recipe
2. **Site Selection**: Choose which site to publish to (from your Sanity site settings)
3. **Cuisine Type**: Select the cuisine category
4. **Difficulty Level**: Choose Easy, Medium, or Hard
5. **Author Selection**: Pick from existing authors in your Sanity dataset
6. **Category Selection**: Choose one or more categories for the recipe
7. **AI Generation**: The script generates comprehensive content using Gemini AI
8. **Preview & Confirm**: Review the generated content before publishing

### Generated Content

The script generates:

- **Basic Info**: Title, slug, excerpt, description
- **Recipe Details**: Prep time, cook time, servings, difficulty, cuisine
- **Ingredients**: Detailed ingredient list with measurements
- **Instructions**: Step-by-step cooking instructions
- **Article Content**: 
  - Introduction paragraph
  - Why you'll love this recipe
  - Ingredient details with tips
  - Instruction steps with explanations
  - Storage and substitution tips
  - Serving suggestions
  - Cultural context
  - Pro tips
  - FAQs
- **Nutrition Info**: Calories, protein, carbs, fat
- **Additional Data**: Equipment needed, dietary info, allergen warnings

### Requirements

Before running the script, make sure you have:

1. **Sanity Project Setup**: 
   - Site settings document with published status
   - At least one author document
   - At least one category document

2. **Environment Variables**:
   - Valid Sanity project ID and write token
   - Gemini API key
   - Site ID for multi-tenant setup

### Example Output

The script will create a complete recipe document in Sanity with all the required fields populated. You can then:

- View the recipe on your website at `/recipes/[slug]`
- Edit the recipe in Sanity Studio
- Add images to the recipe manually in Sanity
- Publish or unpublish as needed

### Troubleshooting

- **"No site settings found"**: Create a site settings document in Sanity with `published: true`
- **"No authors found"**: Create at least one author document linked to your site
- **"No categories found"**: Create at least one category document linked to your site
- **"API key error"**: Verify your Gemini API key is correct and has sufficient quota
- **"Sanity token error"**: Ensure your Sanity token has write permissions

### Asset Download (`download-assets.js`)

Downloads all images from Sanity to local files for static hosting.

```bash
npm run download-assets
```

This script is automatically run during the build process (`npm run build`). 