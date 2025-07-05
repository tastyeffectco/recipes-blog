// Mock data for development/demo purposes
export const mockRecipes = [
  {
    _id: '1',
    title: 'Classic Chocolate Chip Cookies',
    slug: { current: 'chocolate-chip-cookies' },
    excerpt: 'Perfectly chewy chocolate chip cookies with a crispy edge and soft center.',
    description: 'Learn how to make the perfect Classic Chocolate Chip Cookies with this foolproof recipe that delivers soft, chewy centers and crispy edges every time.',
    mainImage: {
      asset: {
        url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop'
      },
      alt: 'Fresh baked chocolate chip cookies on a cooling rack'
    },
    prepTime: 15,
    cookTime: 12,
    servings: 24,
    difficulty: 'Easy',
    ingredients: [
      '2 1/4 cups all-purpose flour',
      '1 tsp baking soda',
      '1 tsp salt',
      '1 cup butter, softened',
      '3/4 cup granulated sugar',
      '3/4 cup packed brown sugar',
      '2 large eggs',
      '2 tsp vanilla extract',
      '2 cups chocolate chips'
    ],
    instructions: [
      'Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.',
      'In a medium bowl, whisk together flour, baking soda, and salt.',
      'In a large bowl, cream butter and both sugars until light and fluffy.',
      'Beat in eggs one at a time, then vanilla.',
      'Gradually mix in flour mixture until just combined.',
      'Fold in chocolate chips.',
      'Drop rounded tablespoons of dough onto prepared baking sheets.',
      'Bake for 9-12 minutes until golden brown around edges.',
      'Cool on baking sheet for 5 minutes before transferring to wire rack.'
    ],
    tips: [
      'Don\'t overbake - cookies will continue cooking on the hot pan',
      'Use room temperature ingredients for best mixing',
      'Chill dough for 30 minutes for thicker cookies'
    ],
    notes: [
      'These cookies freeze well for up to 3 months',
      'Try adding nuts or different chocolate types for variety',
      'Double the recipe for parties - they go fast!'
    ],
    totalTime: '27 Minutes',
    cuisine: 'American',
    yield: '24 cookies',
    dietary: ['Vegetarian'],
    equipment: ['Mixing bowls', 'Baking sheets', 'Wire rack'],
    allergyInfo: ['Contains Dairy', 'Contains Eggs', 'Contains Gluten'],
    nutrition: {
      calories: 150,
      protein: 2,
      carbs: 22,
      fat: 7,
      fiber: 1,
      sugar: 14,
      sodium: 95,
      cholesterol: 15,
      saturatedFat: 4,
      transFat: 0
    },
    articleContent: {
      introParagraph: 'Classic Chocolate Chip Cookies are for days when you need comfort food at its finest, whether you want to surprise a loved one or just indulge in the timeless combination that never fails. These are soft and chewy cookies with perfectly crispy edges, and for me they have become a family tradition everyone requests year-round.',
      whyLoveThis: [
        'Ready in under 30 minutes from start to finish',
        'Perfect balance of chewy center and crispy edges',
        'Uses simple pantry ingredients you likely have on hand',
        'Great for gifting or sharing with friends and family'
      ],
      secondParagraph: 'I remember making these with my grandmother on weekend afternoons and thinking nothing beats the smell of fresh cookies in the oven. They are now my go-to for any gathering and I love how they make the whole house feel warm and welcoming.',
      ingredientsList: [
        {
          ingredientTitle: 'All-purpose flour',
          ingredientDetail: 'Provides structure for perfectly textured cookies - measure by spooning into the cup and leveling off'
        },
        {
          ingredientTitle: 'Baking soda',
          ingredientDetail: 'For the perfect rise and tender texture - check freshness for best results'
        },
        {
          ingredientTitle: 'Salt',
          ingredientDetail: 'Enhances all the flavors and balances sweetness - use fine sea salt if available'
        },
        {
          ingredientTitle: 'Butter, softened',
          ingredientDetail: 'Creates rich flavor and perfect texture - high quality butter makes a difference'
        },
        {
          ingredientTitle: 'Granulated sugar',
          ingredientDetail: 'Helps create those crispy edges we all love'
        },
        {
          ingredientTitle: 'Brown sugar, packed',
          ingredientDetail: 'Adds moisture and caramel notes for extra chewiness'
        },
        {
          ingredientTitle: 'Large eggs',
          ingredientDetail: 'Binds everything together and adds richness'
        },
        {
          ingredientTitle: 'Vanilla extract',
          ingredientDetail: 'Pure vanilla extract brings out all the other flavors beautifully'
        },
        {
          ingredientTitle: 'Chocolate chips',
          ingredientDetail: 'Use high-quality chocolate chips for the best flavor - semi-sweet works perfectly'
        }
      ],
      instructionsList: [
        {
          stepTitle: 'Preheat and Prepare',
          stepDetail: 'Preheat oven to 375°F and line baking sheets with parchment paper for easy removal'
        },
        {
          stepTitle: 'Mix Dry Ingredients',
          stepDetail: 'Whisk flour, baking soda, and salt in a medium bowl until evenly combined'
        },
        {
          stepTitle: 'Cream Butter and Sugars',
          stepDetail: 'Beat softened butter with both sugars until light and fluffy, about 3-4 minutes'
        },
        {
          stepTitle: 'Add Eggs and Vanilla',
          stepDetail: 'Beat in eggs one at a time, then vanilla, mixing until well combined'
        },
        {
          stepTitle: 'Combine Wet and Dry',
          stepDetail: 'Gradually mix in flour mixture until just combined - don\'t overmix'
        },
        {
          stepTitle: 'Fold in Chocolate',
          stepDetail: 'Gently fold in chocolate chips until evenly distributed throughout the dough'
        },
        {
          stepTitle: 'Shape and Bake',
          stepDetail: 'Drop rounded tablespoons of dough onto prepared baking sheets, spacing 2 inches apart'
        },
        {
          stepTitle: 'Bake to Perfection',
          stepDetail: 'Bake for 9-12 minutes until golden brown around edges but centers still look soft'
        },
        {
          stepTitle: 'Cool Properly',
          stepDetail: 'Let cool on baking sheet for 5 minutes before transferring to wire rack'
        }
      ],
      firstImage: {
        asset: {
          url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=600&fit=crop'
        }
      },
      firstImageAlt: 'Freshly baked chocolate chip cookies cooling on a wire rack',
      firstImageCaption: 'Freshly baked chocolate chip cookies cooling on a wire rack',
      mustKnow: [
        'Don\'t overbake - cookies continue cooking on the hot pan after removal',
        'Room temperature ingredients mix more easily and create better texture',
        'Chilling dough for 30 minutes creates thicker, chewier cookies'
      ],
      thirdParagraph: 'My favorite part is definitely watching the chocolate chips melt slightly while baking, creating those perfect pockets of chocolate in every bite. I love how the house fills with that irresistible aroma that brings everyone to the kitchen.',
      storageTips: 'Store cookies in an airtight container at room temperature for up to one week. For longer storage, freeze unbaked dough balls for up to 3 months and bake directly from frozen, adding 1-2 extra minutes to baking time.',
      substitutionTips: 'You can substitute half the chocolate chips with chopped nuts, dried fruit, or even butterscotch chips. For gluten-free cookies, use a 1:1 gluten-free flour blend, though texture may vary slightly.',
      servingSuggestions: 'These cookies are perfect on their own with a glass of cold milk, crumbled over ice cream, or packed in lunch boxes for a sweet surprise. Try warming them slightly in the microwave for that fresh-from-the-oven experience.',
      culturalContext: 'Chocolate chip cookies were invented in the 1930s by Ruth Wakefield at the Toll House Inn, and they\'ve been America\'s favorite cookie ever since. This recipe honors that classic tradition while ensuring consistent, bakery-quality results every time.',
      secondImage: {
        asset: {
          url: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop'
        }
      },
      secondImageAlt: 'Stack of chocolate chip cookies with a glass of milk',
      secondImageCaption: 'Stack of chocolate chip cookies with a glass of milk',
      proTips: [
        'Use a cookie scoop for perfectly uniform cookies every time',
        'Slightly underbake for extra chewy centers',
        'Press a few extra chocolate chips on top before baking for a bakery look'
      ],
      fourthParagraph: 'The secret to perfect cookies is in the timing and temperature - patience during baking and proper cooling creates that ideal texture contrast between crispy edges and soft centers that makes these absolutely irresistible.',
      faqs: [
        {
          question: 'Why are my cookies spreading too much?',
          answer: 'This usually happens when butter is too warm or dough hasn\'t been chilled. Try refrigerating the dough for 30 minutes before baking.'
        },
        {
          question: 'Can I make the dough ahead of time?',
          answer: 'Yes! Cookie dough can be made up to 3 days ahead and stored in the refrigerator, or frozen for up to 3 months.'
        },
        {
          question: 'What\'s the best way to get perfectly round cookies?',
          answer: 'Use a cookie scoop for uniform size, and gently reshape cookies with a round cutter immediately after baking while they\'re still warm.'
        },
        {
          question: 'How do I know when they\'re done?',
          answer: 'Cookies are done when edges are golden brown but centers still look slightly underdone - they\'ll finish cooking on the hot pan.'
        },
        {
          question: 'Can I use different types of chocolate?',
          answer: 'Absolutely! Try dark chocolate chunks, white chocolate chips, or even a mix of different chocolates for variety.'
        }
      ]
    },
    author: {
      name: 'Sarah Johnson',
      slug: { current: 'sarah-johnson' },
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1494790108755-2616b52d1b02?w=150&h=150&fit=crop&crop=face'
        }
      },
      bio: 'Home baker and recipe developer with over 10 years of experience.'
    },
    categories: [
      { title: 'Desserts', slug: { current: 'desserts' } },
      { title: 'Cookies', slug: { current: 'cookies' } }
    ],
    publishedAt: '2024-01-15T10:00:00Z',
    _updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    _id: '2',
    title: 'Creamy Chicken Alfredo',
    slug: { current: 'chicken-alfredo' },
    excerpt: 'Rich and creamy chicken alfredo with tender pasta and perfectly seasoned chicken.',
    description: 'Master the art of making restaurant-quality Creamy Chicken Alfredo at home with this step-by-step recipe featuring tender chicken and silky smooth sauce.',
    mainImage: {
      asset: {
        url: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&h=600&fit=crop'
      },
      alt: 'Plate of chicken alfredo pasta with fresh herbs'
    },
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      '1 lb fettuccine pasta',
      '2 chicken breasts, sliced',
      '1 cup heavy cream',
      '1/2 cup butter',
      '1 cup grated Parmesan cheese',
      '3 cloves garlic, minced',
      '2 tbsp olive oil',
      'Salt and pepper to taste',
      'Fresh parsley for garnish'
    ],
    instructions: [
      'Cook pasta according to package directions. Reserve 1 cup pasta water.',
      'Season chicken with salt and pepper. Heat olive oil in large skillet.',
      'Cook chicken until golden brown and cooked through, about 6-8 minutes per side.',
      'Remove chicken and set aside.',
      'In same skillet, melt butter and sauté garlic for 1 minute.',
      'Add heavy cream and bring to a simmer.',
      'Gradually whisk in Parmesan cheese until smooth.',
      'Add cooked pasta and chicken back to the pan.',
      'Toss everything together, adding pasta water if needed.',
      'Serve immediately with fresh parsley.'
    ],
    tips: [
      'Don\'t let the cream boil or it may curdle',
      'Use freshly grated Parmesan for best flavor',
      'Reserve pasta water - it helps bind the sauce'
    ],
    notes: [
      'Can substitute chicken with shrimp or vegetables for variety',
      'Leftover sauce can be stored in fridge for 3 days',
      'Add broccoli or peas for extra vegetables'
    ],
    totalTime: '45 Minutes',
    cuisine: 'Italian',
    yield: '4 servings',
    dietary: ['Gluten-Free Option'],
    equipment: ['Large skillet', 'Large pot', 'Whisk'],
    allergyInfo: ['Contains Dairy', 'Contains Gluten'],
    nutrition: {
      calories: 680,
      protein: 42,
      carbs: 58,
      fat: 32,
      fiber: 3,
      sugar: 4,
      sodium: 890,
      cholesterol: 120,
      saturatedFat: 18,
      transFat: 0
    },
    author: {
      name: 'Marco Romano',
      slug: { current: 'marco-romano' },
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        }
      },
      bio: 'Italian chef specializing in traditional pasta dishes and modern interpretations.'
    },
    categories: [
      { title: 'Main Courses', slug: { current: 'main-courses' } },
      { title: 'Pasta', slug: { current: 'pasta' } }
    ],
    publishedAt: '2024-01-10T14:30:00Z',
    _updatedAt: '2024-01-15T11:20:00Z'
  },
  {
    _id: '3',
    title: 'Fresh Garden Salad',
    slug: { current: 'fresh-garden-salad' },
    excerpt: 'A vibrant mix of fresh greens, vegetables, and herbs with a light vinaigrette.',
    description: 'Create a colorful and nutritious Fresh Garden Salad with crisp vegetables and homemade vinaigrette dressing that\'s perfect for any meal.',
    mainImage: {
      asset: {
        url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop'
      },
      alt: 'Colorful fresh salad with mixed greens and vegetables'
    },
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '4 cups mixed greens',
      '1 cucumber, sliced',
      '2 tomatoes, diced',
      '1/2 red onion, thinly sliced',
      '1/4 cup olive oil',
      '2 tbsp balsamic vinegar',
      '1 tsp Dijon mustard',
      '1 tsp honey',
      'Salt and pepper to taste',
      '1/4 cup crumbled feta cheese'
    ],
    instructions: [
      'Wash and dry all vegetables thoroughly.',
      'In a large bowl, combine mixed greens, cucumber, tomatoes, and red onion.',
      'In a small bowl, whisk together olive oil, balsamic vinegar, Dijon mustard, and honey.',
      'Season dressing with salt and pepper.',
      'Just before serving, drizzle dressing over salad and toss gently.',
      'Top with crumbled feta cheese.',
      'Serve immediately.'
    ],
    tips: [
      'Add dressing just before serving to prevent wilting',
      'Use a salad spinner to dry greens thoroughly',
      'Let the salad sit for 2-3 minutes after dressing for flavors to meld'
    ],
    notes: [
      'Great as a side dish or light lunch',
      'Add protein like grilled chicken or chickpeas to make it a complete meal',
      'Try different vinegars for unique flavor profiles'
    ],
    totalTime: '15 Minutes',
    cuisine: 'Mediterranean',
    yield: '2 servings',
    dietary: ['Vegetarian', 'Gluten-Free', 'Low-Carb'],
    equipment: ['Salad spinner', 'Large bowl', 'Whisk'],
    allergyInfo: ['Contains Dairy', 'May contain traces of nuts'],
    nutrition: {
      calories: 180,
      protein: 6,
      carbs: 12,
      fat: 14,
      fiber: 4,
      sugar: 8,
      sodium: 245,
      cholesterol: 15,
      saturatedFat: 4,
      transFat: 0
    },
    author: {
      name: 'Emma Green',
      slug: { current: 'emma-green' },
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        }
      },
      bio: 'Nutritionist and advocate for fresh, seasonal eating and sustainable cooking.'
    },
    categories: [
      { title: 'Salads', slug: { current: 'salads' } },
      { title: 'Healthy', slug: { current: 'healthy' } }
    ],
    publishedAt: '2024-01-05T09:15:00Z',
    _updatedAt: '2024-01-12T16:45:00Z'
  },
  {
    _id: '4',
    title: 'Homemade Pizza Margherita',
    slug: { current: 'pizza-margherita' },
    excerpt: 'Classic Italian pizza with fresh tomatoes, mozzarella, and basil on homemade dough.',
    description: 'Discover how to make authentic Homemade Pizza Margherita from scratch with this traditional Italian recipe featuring fresh mozzarella and aromatic basil.',
    mainImage: {
      asset: {
        url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop'
      },
      alt: 'Fresh pizza margherita with melted mozzarella and basil'
    },
    prepTime: 30,
    cookTime: 15,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      '2 cups all-purpose flour',
      '1 tsp active dry yeast',
      '1 tsp sugar',
      '1 tsp salt',
      '3/4 cup warm water',
      '2 tbsp olive oil',
      '1/2 cup pizza sauce',
      '8 oz fresh mozzarella, sliced',
      '2 tomatoes, sliced',
      'Fresh basil leaves',
      'Extra olive oil for drizzling'
    ],
    instructions: [
      'In a bowl, combine warm water, yeast, and sugar. Let sit for 5 minutes until foamy.',
      'In a large bowl, mix flour and salt. Add yeast mixture and olive oil.',
      'Knead dough for 8-10 minutes until smooth and elastic.',
      'Place in oiled bowl, cover, and let rise for 1 hour.',
      'Preheat oven to 475°F (245°C).',
      'Roll out dough on floured surface to fit your pan.',
      'Spread pizza sauce evenly over dough.',
      'Top with mozzarella slices and tomato slices.',
      'Bake for 12-15 minutes until crust is golden and cheese is bubbly.',
      'Top with fresh basil and drizzle with olive oil before serving.'
    ],
    tips: [
      'Let dough come to room temperature before rolling',
      'Use a pizza stone for crispier crust',
      'Don\'t overload with toppings - less is more'
    ],
    notes: [
      'Dough can be made ahead and refrigerated for up to 3 days',
      'Try different toppings like prosciutto or arugula for variety',
      'For crispy crust, preheat your baking sheet or stone in the oven'
    ],
    totalTime: '45 Minutes',
    cuisine: 'Italian',
    yield: '4 servings',
    dietary: ['Vegetarian'],
    equipment: ['Large bowl', 'Pizza stone or baking sheet', 'Rolling pin'],
    allergyInfo: ['Contains Dairy', 'Contains Gluten'],
    nutrition: {
      calories: 420,
      protein: 18,
      carbs: 52,
      fat: 16,
      fiber: 3,
      sugar: 6,
      sodium: 750,
      cholesterol: 25,
      saturatedFat: 8,
      transFat: 0
    },
    author: {
      name: 'Giuseppe Rossi',
      slug: { current: 'giuseppe-rossi' },
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }
      },
      bio: 'Third-generation Italian pizzaiolo from Naples, bringing authentic techniques to home cooking.'
    },
    categories: [
      { title: 'Main Courses', slug: { current: 'main-courses' } },
      { title: 'Italian', slug: { current: 'italian' } }
    ],
    publishedAt: '2024-01-01T16:45:00Z',
    _updatedAt: '2024-01-08T10:30:00Z'
  }
];

export const mockAuthors = [
  {
    _id: 'author-1',
    name: 'Sarah Johnson',
    slug: { current: 'sarah-johnson' },
    image: {
      asset: {
        url: 'https://images.unsplash.com/photo-1494790108755-2616b52d1b02?w=150&h=150&fit=crop&crop=face'
      }
    },
    bio: 'Home baker and recipe developer with over 10 years of experience.',
    recipeCount: 1
  },
  {
    _id: 'author-2',
    name: 'Marco Romano',
    slug: { current: 'marco-romano' },
    image: {
      asset: {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      }
    },
    bio: 'Italian chef specializing in traditional pasta dishes and modern interpretations.',
    recipeCount: 1
  }
];

export const mockCategories = [
  {
    _id: 'cat-1',
    title: 'Desserts',
    slug: { current: 'desserts' },
    description: 'Sweet treats and desserts for every occasion',
    recipeCount: 1
  },
  {
    _id: 'cat-2',
    title: 'Main Courses',
    slug: { current: 'main-courses' },
    description: 'Hearty main dishes for lunch and dinner',
    recipeCount: 2
  },
  {
    _id: 'cat-3',
    title: 'Salads',
    slug: { current: 'salads' },
    description: 'Fresh and healthy salad recipes',
    recipeCount: 1
  }
]; 