// import { GoogleGenerativeAI } from '@google/generative-ai';

import { NextResponse } from "next/server";
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// console.log("Api key from ask.js : " + process.env.GEMINI_API_KEY);

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Only POST allowed' });
//   }

//   const { question } = req.body;

//   if (!question) {
//     return res.status(400).json({ error: 'Question is required' });
//   }

//   try {
//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//     const result = await model.generateContent(question);
//     const response = await result.response;
//     const text = response.text();

//     res.status(200).json({ answer: text });
//   } catch (error) {
//     console.error('Gemini error:', error);
//     res.status(500).json({ error: error.message || 'Failed to get answer' });
//   }
// }



// app/api/ask/route.js
// export async function POST(req) {
//   const { prompt } = await req.json();
//   console.log(" Question Prompt from ask.js : " + prompt);
//   // const res = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
//   //   method: 'POST',
//   //   headers: {
//   //     Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
//   //     'Content-Type': 'application/json',
//   //   },
//   //   body: JSON.stringify({ inputs: prompt }),
//   // });

//   // const result = await res.json();
//   // console.log("Result from hugging face : " + result);


// console.log("DEEPSEEK_APIKEY :"+process.env.DEEPSEEKR1_APIKEY.trim()) ;

// const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//   method: "POST",
//   headers: {
//     "Authorization": `Bearer ${process.env.DEEPSEEKR1_APIKEY.trim()}`,
//     "HTTP-Referer": "http://localhost:3000/" , // Optional. Site URL for rankings on openrouter.ai.
//      "X-Title": "Chef Claude", // Optional. Site title for rankings on openrouter.ai.
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     "model": "deepseek/deepseek-r1-0528:free",
//     "messages": [
//       {
//         "role": "user",
//         "content": `${prompt}` ,
//       }
//     ]
//   })
// });

// if(!res.ok)
// {const errorData = await res.json() ;
//  return NextResponse({Error : errorData , status :400}) ;
// }

// console.log("Response form deepseek api call : " , res) ;
// const response = await res.json() ;

// console.log("response in json format : " , response) ;


// return NextResponse.json( {response : JSON.stringify(response) ,status : 200 } ) ;

// }




export async function POST(req) {
  const { prompt } = await req.json();
  console.log("Received prompt on server API:", prompt);

  // Retrieve API key securely from environment variables
  const openRouterApiKey = process.env.DEEPSEEKR1_API_KEY;

  if (!openRouterApiKey) {
    console.error("ERROR: DEEPSEEKR1_API_KEY is not set in environment variables.");
    return NextResponse.json(
      { error: 'Server configuration error: API Key is missing.' },
      { status: 500 }
    );
  }

  try {
    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json",
        // Optional: Include HTTP-Referer and X-Title if you want your usage to be tracked on OpenRouter rankings
        // "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || 'https://my-chatbot-domain.com', // Replace with your public URL if available
        // "X-Title": "My DeepSeek Chatbot App",
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-r1-0528:free", // Ensure this model is available and free on your OpenRouter plan
        "messages": [
          {
            "role": "user",
            "content": prompt,
          }
        ],
        "temperature": 0.7, // Adjust creativity
        //"max_tokens": 500, // Limit response length
      })
    });

    // Check for non-OK HTTP status from OpenRouter
    if (!openRouterResponse.ok) {
      const errorData = await openRouterResponse.json();
      console.error('OpenRouter API Error Response:', errorData);
      return NextResponse.json(
        { error: `OpenRouter API error: ${openRouterResponse.status} ${openRouterResponse.statusText}. Details: ${errorData.error?.message || errorData.message || 'Unknown error'}` },
        { status: openRouterResponse.status }
      );
    }

    // Correctly parse the JSON response body from OpenRouter
    const data = await openRouterResponse.json();
    console.log("Parsed Data from DeepSeek API call:", data);
    console.log("Message from DeepSeek : ",data.message)
    const messageString = JSON.stringify(data.message)
    console.log("Message from DeepSeek in string format : " , messageString) ;  

    // Validate the structure of the AI response
    if (!data.choices || data.choices.length === 0 || !data.choices[0].message || !data.choices[0].message.content) {
      console.error('Unexpected response structure from DeepSeek API:', data);
      return NextResponse.json(
        { error: 'Unexpected response format from DeepSeek API. Please check OpenRouter logs or model availability.' },
        { status: 500 }
      );
    }

    const aiMessage = data.choices[0].message.content;

    // Return the AI's answer back to the client
    return NextResponse.json({ answer: aiMessage });

  } catch (error) {
    console.error('Server-side fetch error:', error);
    // Return a generic internal server error
    return NextResponse.json(
      { error: error.message || 'Internal Server Error during API call.' },
      { status: 500 }
    );
  }
}


export async function GET(req) {
  // 1. Get the URL object from the request
  const { searchParams } = new URL(req.url);

  // 2. Retrieve the 'prompt' from the URL's query parameters
  var prompt = searchParams.get('prompt');
  prompt = `I have the following list of ingredients available in my kitchen: ${prompt}

Please provide me with 3-5 distinct and delicious recipes that I can make using primarily these ingredients. For each recipe, adhere to the following strict format requirements, suitable for direct display in a Next.js web application using react-markdown and react-syntax-highlighter (for code blocks, if any, but unlikely for recipes):

Formatting Requirements:

Markdown Language: The entire output must be in standard Markdown format.
Recipe Card Structure: 
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

//"I have the following lists of ingredients in my home right now : " + prompt + " , kindly provide me with some of the best recipes , which i can make with my ingredients!! , NOTE : provide the recipes in a markdown format with the markdown language , also with some emojis or stickers etc , give the text color for bold text as HEX #7d785f and for light weight text choose the same color with light text weight, which i can directly give to my webApp for showing it in a beautiful markdown format . Also dont provide with any start welcoming or any other type of paragh ." ;

  console.log("Received prompt on server API (GET):", prompt);

  // --- Rest of your logic remains largely the same ---

  if (!prompt) {
    console.error("ERROR: 'prompt' query parameter is missing.");
    return NextResponse.json(
      { error: 'Bad Request: "prompt" query parameter is required.' },
      { status: 400 } // Use 400 Bad Request for missing required parameters
    );
  }

  // Retrieve API key securely from environment variables
  const openRouterApiKey = process.env.DEEPSEEKR1_API_KEY;

  if (!openRouterApiKey) {
    console.error("ERROR: DEEPSEEKR1_API_KEY is not set in environment variables.");
    return NextResponse.json(
      { error: 'Server configuration error: API Key is missing.' },
      { status: 500 }
    );
  }

  try {
    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST", // The call to OpenRouter's API itself will still be a POST request
      headers: {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json",
        // Optional: Include HTTP-Referer and X-Title if you want your usage to be tracked on OpenRouter rankings
        // "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || 'https://my-chatbot-domain.com',
        // "X-Title": "My DeepSeek Chatbot App",
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-r1-0528:free",
        "messages": [
          {
            "role": "user",
            "content": prompt, // Use the prompt retrieved from the URL
          }
        ],
        "temperature": 0.7,
        //"max_tokens": 500,
      })
    });

    // Check for non-OK HTTP status from OpenRouter
    if (!openRouterResponse.ok) {
      const errorData = await openRouterResponse.json();
      console.error('OpenRouter API Error ❌:', errorData);
      return NextResponse.json(
        { error: `OpenRouter API error: ${openRouterResponse.status} ${openRouterResponse.statusText}. Details: ${errorData.error?.message || errorData.message || 'Unknown error'}` },
        { status: openRouterResponse.status }
      );
    }

    // Correctly parse the JSON response body from OpenRouter
    var data = await openRouterResponse.json();
    console.log("Parsed Data from DeepSeek API call:", data);

    // DeepSeek's response structure usually has 'choices[0].message.content'
    // The previous `console.log("Message from DeepSeek : ",data.message)` was likely incorrect
    // as `data.message` doesn't exist at the top level in OpenRouter's completion response.
    // It's `data.choices[0].message.content`.
    // Let's stick to the correct path.

    // Validate the structure of the AI response
    if (!data.choices || data.choices.length === 0 || !data.choices[0].message || !data.choices[0].message.content) {
      console.error('Unexpected response structure from DeepSeek API❌:', data);
      return NextResponse.json(
        { error: 'Unexpected response format from DeepSeek API. Please check OpenRouter logs or model availability❌.' },
        { status: 500 }
      );
    }
    console.log("Response from the deepseekR1 : ", JSON.stringify(data)) ;
    
    var result = data.choices.map((choice , index )=>{
        console.log("choice🔥🔥🔥 : ",choice.message.content ) ;
        return choice.message.content ;
    })
    
    for(const recipe of result)
    {console.log("Another recipe 🔥🔥🔥🔥🔥🔥 : ", recipe ) ;
    }



    // Return the AI's answer back to the client
    return NextResponse.json({ response : JSON.stringify(result) });

  } catch (error) {
    console.error('Server-side fetch error:', error);
    // Return a generic internal server error
    return NextResponse.json(
      { error: error.message || 'Internal Server Error during API call.' },
      { status: 500 }
    );
  }
}