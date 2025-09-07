import fetch from 'node-fetch';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash';

export default async function fetchGemini(ingredients) {
  const prompt = `Suggest a simple recipe using the following ingredients: ${ingredients.join(', ')}`;

  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
      },
      body: JSON.stringify({ model: GEMINI_MODEL, contents: prompt }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  const recipe = data.candidates[0]?.content?.parts[0]?.text || 'No recipe generated';
  return recipe;
}

