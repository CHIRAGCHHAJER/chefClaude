// export async function askDeepSeekR1(question) {
//   const processedQuestion = "I am giving a list of ingredients i have , give me list of recipe with its complete procedure of how to make it , Give the response in jsx format(in markdown format) text color as text-[rgba(125,120,95,1)] and adjust their font weight according as it is the main heading or the procuder etc . Ingredients list array is : "+ question ;

//     const response = await fetch('/api/ask', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ prompt: processedQuestion }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch answer from DeepSeekR1');
//   }

//   return response ;
// }

import {NextResponse} from  "next/server"


export async function askDeepSeekR1(question){

const encodedQuestion = encodeURIComponent(question) ;
console.log("encodedQuestion : ",encodedQuestion) ;

try {
  const response = await fetch(`/api/ask?prompt=${encodedQuestion}`, {
    method: 'GET', // Explicitly set to GET
    headers: {
      'Content-Type': 'application/json', // Though not strictly necessary for GET, good practice for consistency
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to get AI response');
  }

  const data = await response.json();
  console.log("AI Answer:", data.response );
  return {response : data.response} ;

} catch (error) {
  console.error("Error fetching AI response:", error);
}


}




