import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("Api key : " + process.env.GEMINI_API_KEY )
/**
 * Ask a question using Gemini AI and get the response.
 * @param {string} question - The user's input question.
 * @returns {Promise<string>} - The AI's text response.
 */
export async function askGemini(question) {
  if (!question) throw new Error('Question is required');

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(question);
    const response = await result.response;

    return response.text(); // Returns a single string
  } catch (err) {
    console.error('Gemini error:', err);
    throw new Error('Failed to get response from Gemini');
  }
}