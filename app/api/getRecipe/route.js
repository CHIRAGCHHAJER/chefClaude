import fetchGemini from '../../lib/Ai-APIs/fetchGemini.js'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const ingredientsParam = searchParams.get('ingredients')

    if (!ingredientsParam) {
      return new NextResponse.json(
        { error: 'Ingredients are required' },
        { status: 400 }
      )
    }

    const ingredients = ingredientsParam.split(',').map((i) => i.trim())
    const response = await fetchGemini(ingredients)

    if (!response.ok)
      return NextResponse.json({ error: response.error }, { status: 400 })

    const data = await response.json()
    //console.log(`data from the fetchGemini function :\n`)
    //console.log(JSON.stringify(data, null, 2))
    return NextResponse.json(
      { recipe: data.recipe },
      { status: 200 }
      //{ headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error fetching recipe:', error)
    return NextResponse(
      { error },
      { status: 400 }
      //{ headers: { 'Content-Type': 'application/json' } }
    )
  }
}
