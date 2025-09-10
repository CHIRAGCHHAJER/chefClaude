// import fetch from 'node-fetch';

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const GEMINI_MODEL = 'gemini-2.5-flash';

// export default async function fetchGemini(ingredients) {
//   const prompt = `I have the following list of ingredients available in my kitchen: ${ingredients.join(', ')}.

// Please provide me with 3-5 distinct and delicious recipes that I can make using primarily these ingredients. For each recipe, adhere to the following strict format requirements, suitable for direct display in a Next.js web application using react-markdown and react-syntax-highlighter (for code blocks, if any, but unlikely for recipes):

// Formatting Requirements:

// Markdown Language: The entire output must be in standard Markdown format.
// Recipe Card Structure: 
// Start with the first recipe level2 heading(##) with underline under it .
// give the text color : hex #7d785f and adjust the font-weight according to if it is a heading(then font should be bold) , if it is a parargh(text should be normal) etc .
// Start each recipe with a level 2 heading (##) with underline under it .
// Include a short, enticing description (p tag equivalent).
// include a new line .
// Use a level 3 heading for "Ingredients" (###) with underline under it.
// List ingredients using an unordered list (-).
// Use a level 3 heading for "Instructions" (###) with underline under it.
// List instructions using an ordered list (1.).
// Text Styling:
// Bold Text: Any bold text in the recipe (e.g., recipe titles, key ingredient names) should be styled using Markdown bold syntax (**text**).
// Light-weight Text: For descriptive paragraphs and list items (ingredients, instructions), use standard Markdown. Assume the rendering environment will apply the HEX color #7d785f with a font-weight of 300 to this text. Do not embed inline styles or color codes.
// Emojis/Stickers: Incorporate relevant food-related emojis (e.g., 🍳, 🍝, 🥗, 🌶️, 🧀, 🍅, 🌿, 🍞, 🥔, 🍋, 🥑, etc.) naturally within the recipe titles, descriptions, and ingredient lists to enhance visual appeal.
// No Preambles/Postambles: Do not include any welcoming messages, introductory paragraphs, concluding remarks, or conversational text outside of the actual recipe Markdown. The output should begin directly with the first recipe's Markdown heading.
// Recipe Generation Guidelines:

// Prioritize Available Ingredients: Focus on recipes that primarily use the provided ingredients. Minor, common pantry staples (like salt, pepper, water, basic cooking oil) can be assumed if essential, but do not introduce major new ingredients not listed.
// Variety (if possible): If the ingredients allow, provide a variety of meal types (e.g., breakfast, lunch, dinner, snack).
// Clarity and Conciseness: Instructions should be clear, step-by-step, and concise.
// Yield/Servings (Optional but helpful): If feasible, include an estimated serving size or yield.` ; 

//   const response = await fetch(
//     'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${GEMINI_API_KEY}`,
//       },
//       body: JSON.stringify({ model: GEMINI_MODEL, contents: prompt }),
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }

//   const data = await response.json();
//   const recipe = data.candidates[0]?.content?.parts[0]?.text || 'No recipe generated';
//   return recipe;
// }

import fetch from 'node-fetch';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash';

export default async function fetchGemini(ingredients) {
//  const prompt = `Suggest a recipe using ALL of these ingredients: ${ingredients.join(', ')}`;
const prompt = `I have the following list of ingredients available in my kitchen: ${ingredients.join(', ')} ,and all common masalas and basic ingredients in a kitchen like oil , sugar , salt etc .

Please provide me with 6 - 9 distinct and delicious recipes that I can make using primarily these ingredients. For each recipe, adhere to the following strict format requirements, suitable for direct display in a Next.js web application using react-markdown and react-syntax-highlighter (for code blocks, if any, but unlikely for recipes):

Formatting Requirements:

Markdown Language: The entire output must be in standard Markdown format.Dont include any HTML tags  . eg : <u>, <br>, <ol>, <li>, <div>, or inline CSS. 

Recipe Card Structure: 

Necessay dtyling rules for recipe headings , subheadings and all the contents under them : 
Give the text color : hex #7d785f and adjust the font-weight according to if it is a heading or subheading (then font should be bold) , if it is a parargh or list items (text should be normal) etc .
Bold Text: Any bold text in the recipe (e.g., recipe titles, all ingredient names) should be styled using Markdown bold syntax (**text**).
Light-weight Text: For descriptive paragraphs and list items (ingredients quantity , instructions contents / instructions paragh ), use standard Markdown. Assume the rendering environment will apply the HEX color #7d785f with a font-weight of 300 to this text. Do not embed inline styles or color codes.
Give a underline under all the headings(#) and subheadings(# , ##) and two line space (1 line space should be given by '\n' that is '\n\n' for two line spaces and not by this <br /> or <br>) before and after them .
Emojis/Stickers: Incorporate relevant food-related emojis (e.g., 🍳, 🍝, 🥗, 🌶️, 🧀, 🍅, 🌿, 🍞, 🥔, 🍋, 🥑, etc.) naturally within the recipe titles, descriptions, and ingredient lists to enhance visual appeal.
No Preambles/Postambles: Do not include any welcoming messages, introductory paragraphs, concluding remarks, or conversational text outside of the actual recipe Markdown. The output should begin directly with a exciting line like  "Hurray !! , we have got some recipes for the ingredients we have : " where the some should be replaced with the number of recipes we have .
Divide the recipes on the basis of their types like For Breakfast Recipes, For Lunch Recipes, For Evening Snacks Recipes or For Dinner Recipes and provide the recipes under the particular sections , starting with "For Breakfast Recipes :" then "For Lunch Recipes :" then "For Evening Snacks Recipes : "and then "For Dinner Recipes :", the sections headings that is "For Breakfast Recipes : ", "For Lunch Recipes : " , etc shuld be in level 1 heading(#) and in bold text with a line space after them .
Then start each recipe under these sections with the styling as mentioned above and as per the content structure as given below.

Give a line space after every heading and subheading and also before the starting of each recipe heading . 

Styling rules for recipe headings and subheadings:
Give the recipes headings the bullet points index number starting from 1 with level 2 heading(##) and bold text(**text**) and underline under it .eg : 1) for the first recipe heading , 2) for the second recipe heading . 
Include a short(3 - 4 lines), enticing description (p tag equivalent).

Styling rules for recipe ingredients and instruction section  : 
Give the ingredients and the instructions content bullet points the index number starting from 1 .
Include a new line .
Use a level 3 heading for "Ingredients" (###) with bold text(**text**) with underline under it.
List ingredients using an unordered list (-).
Include a new line . 
Use a level 3 heading for "Instructions" (###) with bold text(**text**) with underline under it.
List instructions using an ordered list (1.).

Recipe Generation Guidelines:
Prioritize Available Ingredients: Focus on recipes that primarily use the provided ingredients. Minor, common pantry staples (like salt, pepper, water, basic cooking oil) can be assumed if essential, but do not introduce major new ingredients not listed.
Variety (if possible): If the ingredients allow, provide a variety of meal types (e.g., breakfast, lunch, dinner, snack).
Clarity and Conciseness: Instructions should be clear, step-by-step, and concise.
Yield/Servings (Optional but helpful): If feasible, include an estimated serving size or yield.` ;


// const prompt = `You are a recipe generator AI. I will provide you with some ingredients : ${ingredients.join(' , ')} . 
// You must generate exactly 3 recipes using only those ingredients.

// STRICT RULES:
// 1. Your response must be in **pure Markdown only**.  
//    - Do NOT use any HTML tags like <u>, <br>, <ol>, <li>, <div>, or inline CSS.  
//    - Only use Markdown syntax.

// 2. **Recipe Titles**  
//    - Each recipe must start with a numbered level 2 heading.  
//    - Example:  
//      ## 1. Fresh Tomato Salad  
//      ## 2. Tomato Soup  
//      ## 3. Tomato Preserve  

// 3. **Ingredients Section**  
//    - Use bold text for the section heading: "**Ingredients**"  
//    - List items as a **numbered list**, like this:  
//      1. Item one  
//      2. Item two  
//      3. Item three  

// 4. **Instructions Section**  
//    - Use bold text for the section heading: "**Instructions**" 
//    - Write each step as a **numbered list**, like this:  
//      1. Do this  
//      2. Do that  
//      3. Finish  

// 5. Formatting Rules  
//    - Separate recipes with **two blank lines**.  
//    - Do not use dashes `-` for bullet points. Always use 1), 2), 3) for lists.  
//    - Do not include any extra commentary, only the recipes.

// BAD (don't do this):  
// - <u>Ingredients</u>  
// - <br>  
// - - Salt  

// GOOD (do like this): 1. Fresh Tomato Salad

// Ingredients

// 1) 2 Tomato

// 2) 40ml Olive oil

// 3) 30gm Salt

// Instructions

// 1) Wash the tomato

// 2) Slice thinly

// 3) Add salt and oil



// Now, generate 3 recipes with the given ingredients in exactly this format.
// `


const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts : [{text: prompt}]
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`HTTP error! Status: ${response.status}, Body: ${errText}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry  , we cannot  find a good recipe for you 😞 ,\nPlease try again ...., \nand if the problem persists then give us some more ingredients so that we can propvide you some good recipies🔥😋z !! ';
}
