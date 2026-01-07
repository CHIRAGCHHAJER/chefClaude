// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// console.log("Api key : " + process.env.GEMINI_API_KEY )
// /**
//  * Ask a ingredients using Gemini AI and get the response.
//  * @param {string} ingredients - The user's input ingredients.
//  * @returns {Promise<string>} - The AI's text response.
//  */
// export async function askGemini(ingredients) {
//   if (!ingredients) throw new Error('ingredients is required');

//   try {
//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

//     const result = await model.generateContent(ingredients);
//     const response = await result.response;

//     return response.text(); // Returns a single string
//   } catch (err) {
//     console.error('Gemini error:', err);
//     throw new Error('Failed to get response from Gemini');
//   }
// }




import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function askGemini(ingredients) {

console.log("Inside askGemini function✅✅ , ingredients : " , ingredients) ; 
if(!ingredients) throw new Error('Ingredients is required❌❌') ; 

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY ;


const prompt = `I have the following list of ingredients available in my kitchen: ${ingredients.join(' , ')}

Please provide me with 3-5 distinct and delicious recipes that I can make using primarily these ingredients. For each recipe, adhere to the following strict format requirements, suitable for direct display in a Next.js web application using react-markdown and react-syntax-highlighter (for code blocks, if any, but unlikely for recipes):

Formatting Requirements:

Markdown Language: The entire output must be in standard Markdown format.
Recipe Card Structure: 
Start with the first recipe level2 heading(##) with underline under it .
give the text color : hex #7d785f and adjust the font-weight according to if it is a heading(then font should be bold) , if it is a parargh(text should be normal) etc .
Start each recipe with a level 2 heading (##) with underline under it .
Include a short, enticing description (p tag equivalent).
include a new line .
Use a level 3 heading for "Ingredients" (###) with underline under it.
List ingredients using an unordered list (-).
Use a level 3 heading for "Instructions" (###) with underline under it.
List instructions using an ordered list (1.).
Text Styling:
Bold Text: Any bold text in the recipe (e.g., recipe titles, key ingredient names) should be styled using Markdown bold syntax (**text**).
Light-weight Text: For descriptive paragraphs and list items (ingredients, instructions), use standard Markdown. Assume the rendering environment will apply the HEX color #7d785f with a font-weight of 300 to this text. Do not embed inline styles or color codes.
Emojis/Stickers: Incorporate relevant food-related emojis (e.g., 🍳, 🍝, 🥗, 🌶️, 🧀, 🍅, 🌿, 🍞, 🥔, 🍋, 🥑, etc.) naturally within the recipe titles, descriptions, and ingredient lists to enhance visual appeal.
No Preambles/Postambles: Do not include any welcoming messages, introductory paragraphs, concluding remarks, or conversational text outside of the actual recipe Markdown. The output should begin directly with the first recipe's Markdown heading.
Recipe Generation Guidelines:

Prioritize Available Ingredients: Focus on recipes that primarily use the provided ingredients. Minor, common pantry staples (like salt, pepper, water, basic cooking oil) can be assumed if essential, but do not introduce major new ingredients not listed.
Variety (if possible): If the ingredients allow, provide a variety of meal types (e.g., breakfast, lunch, dinner, snack).
Clarity and Conciseness: Instructions should be clear, step-by-step, and concise.
Yield/Servings (Optional but helpful): If feasible, include an estimated serving size or yield.
Preparation/Cook Time (Optional but helpful): If feasible, include estimated prep and cook times ` 




const requestBody = {
    model: GEMINI_MODEL,
    contents: prompt,
  };

try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GEMINI_API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const recipe = data.candidates[0]?.content?.parts[0]?.text || 'No recipe generated';
    console.log("Recipe generated from Gemini AI✅: " , recipe ) ;

   return NextResponse.json({ response : recipe }) ;

  } catch (error) {
    console.error('Error fetching recipe:', error);
    NextResponse.json({ error: error.message } , {status: 500}) ;
  }





}