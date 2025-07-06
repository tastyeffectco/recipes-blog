#!/usr/bin/env node

import { createClient } from '@sanity/client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import inquirer from 'inquirer';
import slugify from 'slugify';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get environment variables
const projectId = process.env.SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || 'lxetvc5g';
const dataset = process.env.SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production';
const geminiApiKey = process.env.GEMINI_API_KEY || process.env.PUBLIC_GEMINI_API_KEY || 'AIzaSyClPMq2R2YIGoXiBsJKncB3lO3YY_jTjcg';

console.log('🍴 Recipe Generator with AI');
console.log('============================');

// Validate environment variables
if (!projectId) {
  console.error('❌ SANITY_PROJECT_ID is required');
  process.exit(1);
}



if (!geminiApiKey) {
  console.error('❌ GEMINI_API_KEY is required for AI generation');
  console.log('💡 Get your API key from: https://makersuite.google.com/app/apikey');
  process.exit(1);
}

// Create clients
const token = process.env.SANITY_TOKEN || process.env.PUBLIC_SANITY_TOKEN || 'skW5UpfJb8hvABkokAWKm64pM2C2Rx3lN64vtPxN9NrrBICHxpO1NqMHToT7vj96WoqdMRUzoMgKZGFfbfud8jXHw8lSRUk2pOcorC6I8ZsQt8kIxf65IuNAD2kr4TDk4QMCoz4gwVXUFoLW22FfsTLteuC8DNI5GGlXpjbsRXVSsPxV7RLi';
const sanityClient = createClient({
  projectId,
  dataset,
  ...(token && { token }),
  useCdn: false,
  apiVersion: '2023-11-01'
});

// Check if token is provided
if (!token) {
  console.error('❌ SANITY_TOKEN is required for creating recipes!');
  console.error('📋 Steps to fix:');
  console.error('1. Go to https://sanity.io/manage');
  console.error('2. Select your project');
  console.error('3. Go to Settings → API → Tokens');
  console.error('4. Create a new token with "Editor" permissions');
  console.error('5. Add it to your .env file as SANITY_TOKEN=your_token_here');
  console.error('6. Restart the script');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Helper function to create slug
function createSlug(title) {
  return slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  });
}

// Helper function to format cooking time
function formatCookingTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0 && mins > 0) {
    return `${hours} Hour${hours > 1 ? 's' : ''} ${mins} Minutes`;
  } else if (hours > 0) {
    return `${hours} Hour${hours > 1 ? 's' : ''}`;
  } else {
    return `${mins} Minutes`;
  }
}

// Get site settings
async function getSiteSettings() {
  try {
    const siteSettings = await sanityClient.fetch(`
      *[_type == "siteSettings" && published == true] {
        _id,
        siteId,
        siteName,
        domain
      }
    `);
    return siteSettings;
  } catch (error) {
    console.error('❌ Error fetching site settings:', error.message);
    return [];
  }
}

// Get authors for a specific site
async function getAuthors(siteId) {
  try {
    const authors = await sanityClient.fetch(`
      *[_type == "author" && siteId->siteId.current == $siteId] {
        _id,
        name,
        slug
      }
    `, { siteId });
    return authors;
  } catch (error) {
    console.error('❌ Error fetching authors:', error.message);
    return [];
  }
}

// Get categories for a specific site
async function getCategories(siteId) {
  try {
    const categories = await sanityClient.fetch(`
      *[_type == "category" && siteId->siteId.current == $siteId] {
        _id,
        title,
        slug
      }
    `, { siteId });
    return categories;
  } catch (error) {
    console.error('❌ Error fetching categories:', error.message);
    return [];
  }
}

// Generate recipe content using Gemini
async function generateRecipeContent(recipeTitle, cuisine = 'American', difficulty = 'Easy') {
  const prompt = `
Generate a complete recipe for "${recipeTitle}" with the following structure. Make it detailed, engaging, and practical:

Please provide a JSON response with the following structure:
{
  "excerpt": "Brief description (2-3 sentences)",
  "description": "SEO-friendly description (1-2 sentences)",
  "introParagraph": "Engaging introduction paragraph about the recipe",
  "whyLoveThis": ["reason 1", "reason 2", "reason 3", "reason 4"],
  "secondParagraph": "Additional context or story about the recipe",
  "ingredientsList": [
    {"ingredientTitle": "ingredient name", "ingredientDetail": "amount and description"}
  ],
  "instructionsList": [
    {"stepTitle": "step name", "stepDetail": "detailed instruction"}
  ],
  "firstImageAlt": "Alt text for main recipe image",
  "firstImageCaption": "Caption for main recipe image",
  "mustKnow": ["tip 1", "tip 2", "tip 3"],
  "thirdParagraph": "Paragraph about variations or adaptations",
  "storageTips": "How to store the recipe",
  "substitutionTips": "Ingredient substitution suggestions",
  "servingSuggestions": "How to serve or pair the dish",
  "culturalContext": "Brief cultural or historical context",
  "secondImageAlt": "Alt text for second image",
  "secondImageCaption": "Caption for second image",
  "proTips": ["pro tip 1", "pro tip 2", "pro tip 3"],
  "fourthParagraph": "Concluding paragraph about the recipe",
  "faqs": [
    {"question": "common question", "answer": "helpful answer"}
  ],
  "prepTime": number_in_minutes,
  "cookTime": number_in_minutes,
  "servings": number_of_servings,
  "difficulty": "${difficulty}",
  "cuisine": "${cuisine}",
  "yield": "description of yield",
  "dietary": ["dietary restriction or benefit"],
  "equipment": ["equipment needed"],
  "nutrition": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number
  },
  "allergyInfo": ["allergen warnings"],
  "ingredients": ["simplified ingredient list for schema"],
  "instructions": ["simplified instruction steps"],
  "notes": ["additional notes or tips"]
}

Make sure the content is engaging, practical, and includes realistic cooking times and nutrition information.
`;

  try {
    console.log('🤖 Generating recipe content with AI...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to extract JSON from the response
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      try {
        const recipeData = JSON.parse(jsonStr);
        
        // Validate required fields
        const requiredFields = ['excerpt', 'description', 'ingredientsList', 'instructionsList', 'prepTime', 'cookTime'];
        const missingFields = requiredFields.filter(field => !recipeData[field]);
        
        if (missingFields.length > 0) {
          console.error('❌ Missing required fields in AI response:', missingFields.join(', '));
          throw new Error(`AI response missing required fields: ${missingFields.join(', ')}`);
        }
        
        // Add default values for optional fields
        const defaultRecipeData = {
          whyLoveThis: [],
          mustKnow: [],
          proTips: [],
          faqs: [],
          dietary: [],
          equipment: [],
          allergyInfo: [],
          notes: [],
          nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
          servings: 4,
          ...recipeData
        };
        
        return defaultRecipeData;
      } catch (parseError) {
        console.error('❌ Failed to parse JSON response:', parseError.message);
        console.log('📝 AI Response:', text.substring(0, 500) + '...');
        throw new Error('Invalid JSON response from AI');
      }
    } else {
      console.error('❌ No JSON found in AI response');
      console.log('📝 AI Response:', text.substring(0, 500) + '...');
      throw new Error('Could not extract JSON from AI response');
    }
  } catch (error) {
    console.error('❌ Error generating recipe content:', error.message);
    throw error;
  }
}

// Create recipe document in Sanity
async function createRecipe(recipeData) {
  try {
    console.log('📝 Creating recipe document in Sanity...');
    
    const result = await sanityClient.create({
      _type: 'recipe',
      ...recipeData,
      publishedAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString()
    });
    
    console.log('✅ Recipe created successfully!');
    console.log(`📍 Recipe ID: ${result._id}`);
    console.log(`🔗 Title: ${result.title}`);
    console.log(`🏷️  Slug: ${result.slug.current}`);
    
    return result;
  } catch (error) {
    console.error('❌ Error creating recipe:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('Insufficient permissions')) {
      console.error('\n🔑 SOLUTION: You need a Sanity token with write permissions!');
      console.error('📋 Steps to fix:');
      console.error('1. Go to https://sanity.io/manage');
      console.error('2. Select your project');
      console.error('3. Go to Settings → API → Tokens');
      console.error('4. Create a new token with "Editor" permissions');
      console.error('5. Add it to your .env file as SANITY_TOKEN=your_token_here');
      console.error('6. Restart the script');
    } else if (error.message.includes('Unauthorized')) {
      console.error('\n🔑 SOLUTION: Invalid Sanity token!');
      console.error('📋 Check that your SANITY_TOKEN in .env is correct');
    } else if (error.message.includes('not found')) {
      console.error('\n🔍 SOLUTION: Check your Sanity project ID and dataset!');
      console.error('📋 Verify SANITY_PROJECT_ID and SANITY_DATASET in .env');
    }
    
    throw error;
  }
}

// Main function
async function main() {
  try {
    console.log('🔍 Fetching site settings...');
    const siteSettings = await getSiteSettings();
    
    if (siteSettings.length === 0) {
      console.error('❌ No site settings found. Please create at least one site setting in Sanity.');
      process.exit(1);
    }
    
    // Get user input
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'recipeTitle',
        message: 'Enter the recipe title:',
        validate: (input) => input.trim() ? true : 'Recipe title is required'
      },
      {
        type: 'list',
        name: 'siteId',
        message: 'Select the site:',
        choices: siteSettings.map(site => ({
          name: `${site.siteName} (${site.siteId?.current || 'No ID'})`,
          value: site.siteId?.current || site._id
        }))
      },
      {
        type: 'list',
        name: 'cuisine',
        message: 'Select cuisine type:',
        choices: [
          'American', 'Italian', 'Mexican', 'Asian', 'Mediterranean', 
          'French', 'Indian', 'Chinese', 'Japanese', 'Thai', 'Greek', 'Other'
        ]
      },
      {
        type: 'list',
        name: 'difficulty',
        message: 'Select difficulty level:',
        choices: ['Easy', 'Medium', 'Hard']
      }
    ]);
    
    // Get authors and categories for selected site
    console.log('🔍 Fetching authors and categories...');
    const authors = await getAuthors(answers.siteId);
    const categories = await getCategories(answers.siteId);
    
    if (authors.length === 0) {
      console.error('❌ No authors found for this site. Please create at least one author in Sanity.');
      process.exit(1);
    }
    
    if (categories.length === 0) {
      console.error('❌ No categories found for this site. Please create at least one category in Sanity.');
      process.exit(1);
    }
    
    // Select author and categories
    const authorChoice = await inquirer.prompt([
      {
        type: 'list',
        name: 'authorId',
        message: 'Select the author:',
        choices: authors.map(author => ({
          name: author.name,
          value: author._id
        }))
      }
    ]);
    
    // Select categories (same approach as author selection)
    console.log(`📋 Available categories: ${categories.map(c => c.title).join(', ')}`);
    
    const selectedCategories = [];
    let addMore = true;
    
    while (addMore && selectedCategories.length < categories.length) {
      const remainingCategories = categories.filter(cat => 
        !selectedCategories.some(selected => selected._id === cat._id)
      );
      
      if (remainingCategories.length === 0) break;
      
      const categorySelection = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedCategory',
          message: `Select a category ${selectedCategories.length > 0 ? `(${selectedCategories.length} already selected)` : ''}:`,
          choices: [
            ...remainingCategories.map(category => ({
              name: category.title,
              value: category._id
            })),
            ...(selectedCategories.length > 0 ? [{ name: '✅ Done selecting categories', value: 'done' }] : [])
          ]
        }
      ]);
      
      if (categorySelection.selectedCategory === 'done') {
        addMore = false;
      } else {
        const selectedCat = categories.find(cat => cat._id === categorySelection.selectedCategory);
        selectedCategories.push(selectedCat);
        console.log(`✅ Added: ${selectedCat.title}`);
        console.log(`📋 Selected categories: ${selectedCategories.map(c => c.title).join(', ')}`);
        
        if (selectedCategories.length === 1) {
          const continueSelection = await inquirer.prompt([
            {
              type: 'confirm',
              name: 'continue',
              message: 'Add more categories?',
              default: false
            }
          ]);
          addMore = continueSelection.continue;
        }
      }
    }
    
    if (selectedCategories.length === 0) {
      console.error('❌ You must select at least one category.');
      process.exit(1);
    }
    
    const categoryChoice = {
      categoryIds: selectedCategories.map(cat => cat._id)
    };

    console.log('✅ Categories selected successfully:', categoryChoice.categoryIds.length, 'categories');
    
    // Generate recipe content
    const generatedContent = await generateRecipeContent(
      answers.recipeTitle,
      answers.cuisine,
      answers.difficulty
    );
    
    // Get site settings reference
    const selectedSite = siteSettings.find(site => 
      (site.siteId?.current || site._id) === answers.siteId
    );
    
    // Construct complete recipe document
    const recipeDocument = {
      title: answers.recipeTitle,
      slug: {
        current: createSlug(answers.recipeTitle)
      },
      siteId: {
        _type: 'reference',
        _ref: selectedSite._id
      },
      author: {
        _type: 'reference',
        _ref: authorChoice.authorId
      },
      categories: categoryChoice.categoryIds.map(id => ({
        _type: 'reference',
        _ref: id
      })),
      excerpt: generatedContent.excerpt,
      description: generatedContent.description,
      prepTime: generatedContent.prepTime,
      cookTime: generatedContent.cookTime,
      totalTime: formatCookingTime(generatedContent.prepTime + generatedContent.cookTime),
      servings: generatedContent.servings,
      difficulty: generatedContent.difficulty,
      cuisine: generatedContent.cuisine,
      yield: generatedContent.yield,
      dietary: generatedContent.dietary,
      equipment: generatedContent.equipment,
      nutrition: generatedContent.nutrition,
      allergyInfo: generatedContent.allergyInfo,
      ingredients: generatedContent.ingredients,
      instructions: generatedContent.instructions,
      notes: generatedContent.notes,
      articleContent: {
        introParagraph: generatedContent.introParagraph,
        whyLoveThis: generatedContent.whyLoveThis,
        secondParagraph: generatedContent.secondParagraph,
        ingredientsList: generatedContent.ingredientsList,
        instructionsList: generatedContent.instructionsList,
        firstImageAlt: generatedContent.firstImageAlt,
        firstImageCaption: generatedContent.firstImageCaption,
        mustKnow: generatedContent.mustKnow,
        thirdParagraph: generatedContent.thirdParagraph,
        storageTips: generatedContent.storageTips,
        substitutionTips: generatedContent.substitutionTips,
        servingSuggestions: generatedContent.servingSuggestions,
        culturalContext: generatedContent.culturalContext,
        secondImageAlt: generatedContent.secondImageAlt,
        secondImageCaption: generatedContent.secondImageCaption,
        proTips: generatedContent.proTips,
        fourthParagraph: generatedContent.fourthParagraph,
        faqs: generatedContent.faqs
      }
    };
    
    // Show preview
    console.log('\n📋 Recipe Preview:');
    console.log(`Title: ${recipeDocument.title}`);
    console.log(`Slug: ${recipeDocument.slug.current}`);
    console.log(`Cuisine: ${recipeDocument.cuisine}`);
    console.log(`Difficulty: ${recipeDocument.difficulty}`);
    console.log(`Prep Time: ${recipeDocument.prepTime} minutes`);
    console.log(`Cook Time: ${recipeDocument.cookTime} minutes`);
    console.log(`Servings: ${recipeDocument.servings}`);
    console.log(`Excerpt: ${recipeDocument.excerpt}`);
    
    // Confirm creation
    const confirmation = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'create',
        message: 'Create this recipe in Sanity?',
        default: true
      }
    ]);
    
    if (confirmation.create) {
      const createdRecipe = await createRecipe(recipeDocument);
      
      console.log('\n🎉 Recipe generation completed successfully!');
      console.log(`🔗 You can view the recipe at: /recipes/${createdRecipe.slug.current}`);
      console.log('📸 Note: You may want to add images to the recipe in Sanity Studio.');
    } else {
      console.log('❌ Recipe creation cancelled.');
    }
    
  } catch (error) {
    console.error('❌ Error in recipe generation:', error.message);
    process.exit(1);
  }
}

// Run the script
main(); 