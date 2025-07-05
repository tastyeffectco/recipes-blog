import { createClient } from '@sanity/client';
import groq from 'groq';
import { mockRecipes, mockAuthors, mockCategories } from './mockData.js';

// Get environment variables with fallbacks
const projectId = process.env.SANITY_PROJECT_ID || import.meta.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || import.meta.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_TOKEN || import.meta.env.SANITY_TOKEN;

// Create client only if we have a project ID (token is optional for public data)
export const sanityClient = projectId ? createClient({
  projectId,
  dataset,
  ...(token && { token }), // Only include token if it exists
  useCdn: true,
  apiVersion: '2023-11-01'
}) : null;

// Fragment for author data
const authorFragment = groq`
  "author": author->{
    name,
    slug,
    image,
    bio
  }
`;

// Fragment for category data
const categoryFragment = groq`
  "categories": categories[]->{
    title,
    slug,
    description
  }
`;

// Fragment for recipe image
const imageFragment = groq`
  mainImage{
    asset,
    alt,
    caption
  }
`;

// Get all recipes with full data
export const getAllRecipesQuery = groq`
  *[_type == "recipe"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    ${imageFragment},
    prepTime,
    cookTime,
    servings,
    difficulty,
    publishedAt,
    _updatedAt,
    ${authorFragment},
    ${categoryFragment}
  }
`;

// Get featured/recent recipes for homepage
export const getFeaturedRecipesQuery = groq`
  *[_type == "recipe"] | order(publishedAt desc)[0...8] {
    _id,
    title,
    slug,
    excerpt,
    ${imageFragment},
    prepTime,
    cookTime,
    servings,
    difficulty,
    publishedAt,
    ${authorFragment},
    ${categoryFragment}
  }
`;

// Get single recipe by slug
export const getRecipeBySlugQuery = groq`
  *[_type == "recipe" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    ${imageFragment},
    prepTime,
    cookTime,
    totalTime,
    servings,
    difficulty,
    cuisine,
    yield,
    dietary,
    equipment,
    allergyInfo,
    ingredients,
    instructions,
    tips,
    notes,
    nutrition,
    articleContent{
      introParagraph,
      whyLoveThis,
      secondParagraph,
      ingredientsList[]{
        ingredientTitle,
        ingredientDetail
      },
      instructionsList[]{
        stepTitle,
        stepDetail
      },
      firstImage{
        asset,
        alt,
        caption
      },
      firstImageAlt,
      firstImageCaption,
      mustKnow,
      thirdParagraph,
      storageTips,
      substitutionTips,
      servingSuggestions,
      culturalContext,
      secondImage{
        asset,
        alt,
        caption
      },
      secondImageAlt,
      secondImageCaption,
      proTips,
      fourthParagraph,
      faqs[]{
        question,
        answer
      }
    },
    publishedAt,
    _updatedAt,
    ${authorFragment},
    ${categoryFragment}
  }
`;

// Get all recipe slugs for static generation
export const getAllRecipeSlugsQuery = groq`
  *[_type == "recipe" && defined(slug.current)]{
    "slug": slug.current
  }
`;

// Get all categories
export const getAllCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    image,
    "recipeCount": count(*[_type == "recipe" && references(^._id)])
  }
`;

// Get recipes by category
export const getRecipesByCategoryQuery = groq`
  *[_type == "recipe" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    ${imageFragment},
    prepTime,
    cookTime,
    servings,
    difficulty,
    publishedAt,
    ${authorFragment},
    ${categoryFragment}
  }
`;

// Get authors
export const getAllAuthorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    image,
    bio,
    "recipeCount": count(*[_type == "recipe" && references(^._id)])
  }
`;

// Get random related recipes (excluding current recipe)
export const getRelatedRecipesQuery = groq`
  *[_type == "recipe" && slug.current != $currentSlug] | order(_updatedAt desc)[0...6] {
    _id,
    title,
    slug,
    excerpt,
    ${imageFragment}
  }
`;

// Get site settings
export const getSiteSettingsQuery = groq`
  *[_type == "siteSettings" && published == true][0] {
    siteId,
    domain,
    siteName,
    tagline,
    logo{
      asset,
      alt,
      caption
    },
    favicon{
      asset,
      alt
    },
    defaultTitle,
    defaultDescription,
    ogImage{
      asset,
      alt,
      caption
    },
    theme{
      primaryColor,
      fontFamily,
      borderRadius,
      layoutStyle
    },
    socialMedia{
      facebook,
      instagram,
      pinterest,
      twitter,
      youtube,
      email
    },
    googleAnalyticsId,
    published
  }
`;

// Export functions to fetch data
export async function getAllRecipes() {
  if (!sanityClient) {
    console.warn('⚠️  Using mock data. Configure Sanity in .env file for real data.');
    return mockRecipes;
  }
  return await sanityClient.fetch(getAllRecipesQuery);
}

export async function getFeaturedRecipes() {
  if (!sanityClient) {
    console.warn('⚠️  Using mock data. Configure Sanity in .env file for real data.');
    return mockRecipes.slice(0, 8); // Return up to 8 recipes
  }
  return await sanityClient.fetch(getFeaturedRecipesQuery);
}

export async function getRecipeBySlug(slug) {
  if (!sanityClient) {
    console.warn('⚠️  Using mock data. Configure Sanity in .env file for real data.');
    return mockRecipes.find(recipe => recipe.slug.current === slug) || null;
  }
  return await sanityClient.fetch(getRecipeBySlugQuery, { slug });
}

export async function getAllRecipeSlugs() {
  if (!sanityClient) {
    console.warn('⚠️  Using mock data. Configure Sanity in .env file for real data.');
    return mockRecipes.map(recipe => ({ slug: recipe.slug.current }));
  }
  return await sanityClient.fetch(getAllRecipeSlugsQuery);
}

export async function getAllCategories() {
  if (!sanityClient) {
    console.warn('⚠️  Using mock data. Configure Sanity in .env file for real data.');
    return mockCategories;
  }
  return await sanityClient.fetch(getAllCategoriesQuery);
}

export async function getRecipesByCategory(categorySlug) {
  if (!sanityClient) {
    console.warn('⚠️  Using mock data. Configure Sanity in .env file for real data.');
    return mockRecipes.filter(recipe => 
      recipe.categories.some(cat => cat.slug.current === categorySlug)
    );
  }
  return await sanityClient.fetch(getRecipesByCategoryQuery, { categorySlug });
}

export async function getAllAuthors() {
  if (!sanityClient) {
    console.warn('⚠️  Using mock data. Configure Sanity in .env file for real data.');
    return mockAuthors;
  }
  return await sanityClient.fetch(getAllAuthorsQuery);
}

export async function getRelatedRecipes(currentSlug) {
  if (!sanityClient) {
    console.warn('⚠️  Using mock data. Configure Sanity in .env file for real data.');
    // Return other recipes excluding the current one
    return mockRecipes
      .filter(recipe => recipe.slug.current !== currentSlug)
      .slice(0, 6)
      .map(recipe => ({
        _id: recipe._id,
        title: recipe.title,
        slug: recipe.slug,
        excerpt: recipe.excerpt,
        mainImage: recipe.mainImage
      }));
  }
  return await sanityClient.fetch(getRelatedRecipesQuery, { currentSlug });
}

export async function getSiteSettings() {
  if (!sanityClient) {
    console.warn('⚠️  Using mock data. Configure Sanity in .env file for real data.');
    return {
      siteId: { current: 'recipes-by-abdel' },
      domain: 'recipesbyadel.com',
      siteName: 'Recipes By Abdel',
      tagline: 'Delicious homemade recipes for every family meal',
      logo: {
        asset: {
          _ref: 'image-logo',
          _type: 'reference'
        },
        alt: 'Recipes By Abdel Logo'
      },
      favicon: {
        asset: {
          _ref: 'image-favicon',
          _type: 'reference'
        },
        alt: 'Recipes By Abdel Favicon'
      },
      defaultTitle: 'Recipes By Abdel - Delicious Homemade Recipes',
      defaultDescription: 'Discover amazing homemade recipes with step-by-step instructions. Perfect for family meals, special occasions, and everyday cooking.',
      ogImage: {
        asset: {
          _ref: 'image-og',
          _type: 'reference'
        },
        alt: 'Recipes By Abdel - Delicious Homemade Recipes'
      },
      theme: {
        primaryColor: '#D54215',
        fontFamily: 'system-ui, sans-serif',
        borderRadius: '8px',
        layoutStyle: 'default'
      },
      socialMedia: {
        facebook: 'https://facebook.com/recipesbyadel',
        instagram: 'https://instagram.com/recipesbyadel',
        pinterest: 'https://pinterest.com/recipesbyadel',
        twitter: 'https://twitter.com/recipesbyadel',
        youtube: 'https://youtube.com/c/recipesbyadel',
        email: 'hello@recipesbyadel.com'
      },
      googleAnalyticsId: null,
      published: true
    };
  }
  return await sanityClient.fetch(getSiteSettingsQuery);
} 