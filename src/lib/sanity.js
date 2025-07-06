import { createClient } from '@sanity/client';
import groq from 'groq';
import { mockRecipes, mockAuthors, mockCategories } from './mockData.js';

// Get environment variables with fallbacks
const projectId = process.env.SANITY_PROJECT_ID || import.meta.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || import.meta.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_TOKEN || import.meta.env.SANITY_TOKEN;
const siteId = process.env.SITE_ID || import.meta.env.SITE_ID || 'default-site';

// Create client only if we have a project ID (token is optional for public data)
export const sanityClient = projectId ? createClient({
  projectId,
  dataset,
  ...(token && { token }), // Only include token if it exists
  useCdn: true,
  apiVersion: '2023-11-01'
}) : null;

// Export siteId for use in other modules
export { siteId };

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
  *[_type == "recipe" && siteId->siteId.current == $siteId] | order(publishedAt desc) {
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
  *[_type == "recipe" && siteId->siteId.current == $siteId] | order(publishedAt desc)[0...8] {
    _id,
    title,
    slug,
    excerpt,
    description,
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
  *[_type == "recipe" && slug.current == $slug && siteId->siteId.current == $siteId][0] {
    _id,
    title,
    slug,
    excerpt,
    description,
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
  *[_type == "recipe" && defined(slug.current) && siteId->siteId.current == $siteId]{
    "slug": slug.current
  }
`;

// Get all categories
export const getAllCategoriesQuery = groq`
  *[_type == "category" && siteId->siteId.current == $siteId] | order(title asc) {
    _id,
    title,
    slug,
    description,
    image,
    "recipeCount": count(*[_type == "recipe" && references(^._id) && siteId->siteId.current == $siteId])
  }
`;

// Get recipes by category
export const getRecipesByCategoryQuery = groq`
  *[_type == "recipe" && references(*[_type == "category" && slug.current == $categorySlug && siteId->siteId.current == $siteId]._id) && siteId->siteId.current == $siteId] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    description,
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
  *[_type == "author" && siteId->siteId.current == $siteId] | order(name asc) {
    _id,
    name,
    slug,
    image,
    bio,
    bio2,
    "recipeCount": count(*[_type == "recipe" && references(^._id) && siteId->siteId.current == $siteId])
  }
`;

// Get random related recipes (excluding current recipe)
export const getRelatedRecipesQuery = groq`
  *[_type == "recipe" && slug.current != $currentSlug && siteId->siteId.current == $siteId] | order(_updatedAt desc)[0...6] {
    _id,
    title,
    slug,
    excerpt,
    description,
    ${imageFragment}
  }
`;

// Get site settings
export const getSiteSettingsQuery = groq`
  *[_type == "siteSettings" && siteId.current == $siteId && published == true][0] {
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
  return await sanityClient.fetch(getAllRecipesQuery, { siteId });
}

export async function getFeaturedRecipes() {
  if (!sanityClient) {
    console.warn('⚠️  Using mock data. Configure Sanity in .env file for real data.');
    return mockRecipes.slice(0, 8); // Return up to 8 recipes
  }
  return await sanityClient.fetch(getFeaturedRecipesQuery, { siteId });
}

export async function getRecipeBySlug(slug) {
  if (!sanityClient) {
    console.warn('⚠️  Using mock data. Configure Sanity in .env file for real data.');
    return mockRecipes.find(recipe => recipe.slug.current === slug) || null;
  }
  return await sanityClient.fetch(getRecipeBySlugQuery, { slug, siteId });
}

export async function getAllRecipeSlugs() {
  if (!sanityClient) {
    console.warn('⚠️  Using mock data. Configure Sanity in .env file for real data.');
    return mockRecipes.map(recipe => ({ slug: recipe.slug.current }));
  }
  return await sanityClient.fetch(getAllRecipeSlugsQuery, { siteId });
}

export async function getAllCategories() {
  if (!sanityClient) {
    console.warn('⚠️  Using mock data. Configure Sanity in .env file for real data.');
    return mockCategories;
  }
  return await sanityClient.fetch(getAllCategoriesQuery, { siteId });
}

export async function getRecipesByCategory(categorySlug) {
  if (!sanityClient) {
    console.warn('⚠️  Using mock data. Configure Sanity in .env file for real data.');
    return mockRecipes.filter(recipe => 
      recipe.categories.some(cat => cat.slug.current === categorySlug)
    );
  }
  return await sanityClient.fetch(getRecipesByCategoryQuery, { categorySlug, siteId });
}

export async function getAllAuthors() {
  if (!sanityClient) {
    console.warn('⚠️  Using mock data. Configure Sanity in .env file for real data.');
    return mockAuthors;
  }
  return await sanityClient.fetch(getAllAuthorsQuery, { siteId });
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
        description: recipe.description,
        mainImage: recipe.mainImage
      }));
  }
  return await sanityClient.fetch(getRelatedRecipesQuery, { currentSlug, siteId });
}

export async function getSiteSettings() {
  if (!sanityClient) {
    console.warn('⚠️  Using mock data. Configure Sanity in .env file for real data.');
    return {
      siteId: { current: siteId },
      domain: 'localhost:4321',
      siteName: 'My Recipe Site',
      tagline: 'Delicious homemade recipes for every family meal',
      logo: {
        asset: {
          _ref: 'image-logo',
          _type: 'reference'
        },
        alt: 'My Recipe Site Logo'
      },
      favicon: {
        asset: {
          _ref: 'image-favicon',
          _type: 'reference'
        },
        alt: 'My Recipe Site Favicon'
      },
      defaultTitle: 'My Recipe Site - Delicious Homemade Recipes',
      defaultDescription: 'Discover amazing homemade recipes with step-by-step instructions. Perfect for family meals, special occasions, and everyday cooking.',
      ogImage: {
        asset: {
          _ref: 'image-og',
          _type: 'reference'
        },
        alt: 'My Recipe Site - Delicious Homemade Recipes'
      },
      theme: {
        primaryColor: '#D54215',
        fontFamily: 'system-ui, sans-serif',
        borderRadius: '8px',
        layoutStyle: 'default'
      },
      socialMedia: {
        facebook: 'https://facebook.com/myrecipesite',
        instagram: 'https://instagram.com/myrecipesite',
        pinterest: 'https://pinterest.com/myrecipesite',
        twitter: 'https://twitter.com/myrecipesite',
        youtube: 'https://youtube.com/c/myrecipesite',
        email: 'hello@myrecipesite.com'
      },
      googleAnalyticsId: null,
      published: true
    };
  }
  return await sanityClient.fetch(getSiteSettingsQuery, { siteId });
} 