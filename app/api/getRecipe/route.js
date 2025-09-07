import fetchGemini from '../../../lib/fetchGemini';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const ingredientsParam = searchParams.get('ingredients');

    if (!ingredientsParam) {
      return new Response(JSON.stringify({ error: 'Ingredients are required' }), { status: 400 });
    }

    const ingredients = ingredientsParam.split(',').map(i => i.trim());
    const recipe = await fetchGemini(ingredients);

    return new Response(JSON.stringify({ recipe }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
