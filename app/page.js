'use client'
     

import Image from "next/image";
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import  React from "react";
//import logo from "C:/Users/chira/OneDrive/Desktop/Next-3/my-next-app/public/logo/appLogo.svg";
//import logo from '../public/logo/appLogo.svg'
import logo from '../public/logo/cooking.png';
import Form from "./components/Form/page.js";
import {useState, useEffect} from 'react' ;
import { handleMouseEnter , handleMouseLeave  , handleMouseDown , handleMouseUp } from './components/interactionFunction';
//import { askGemini } from './AskAi/GeminiAi/askGemini.js';
import { askHuggingFace } from './lib/huggingFace.js';
import {askDeepSeekR1} from './lib/deepSeekR1.js' ;
import Recipe from "./components/recipe/page" ;


export default function Home() {
const [ingredients, setIngredients] = useState([]); // State to store the ingredients
const [recipe , setRecipe] = useState("") ;
//"[\"```markdown\\n## Classic Tomato Bruschetta 🍅🍞\\nFresh tomatoes and aromatic oregano atop crispy toasted bread. Simple yet bursting with Mediterranean flavors.\\n\\n### Ingredients\\n- 4 thick slices **bread**\\n- 2 ripe **tomatoes**, diced\\n- 1 small **onion**, finely chopped\\n- 1 tsp dried **oregano**\\n- 2 tbsp olive oil (pantry staple)\\n- Salt and pepper to taste\\n- Optional: 1 tbsp balsamic vinegar (if available in **sauces**)\\n\\n### Instructions\\n1. Preheat oven to 375°F (190°C). Brush **bread** with olive oil and toast for 8-10 minutes until golden and crisp.\\n2. In a bowl, combine diced **tomatoes**, chopped **onion**, **oregano**, 1 tbsp olive oil, salt, and pepper. Let marinate 5 minutes.\\n3. Spoon tomato mixture generously over toasted **bread** slices.\\n4. Drizzle with balsamic vinegar or other acidic **sauce** if desired. Serve immediately.\\n\\n## Crispy Potato-Onion Hash 🥔🧅\\nGolden potatoes and caramelized onions seasoned with oregano. Perfect savory breakfast or side dish.\\n\\n### Ingredients\\n- 2 large **potatoes**, diced ½-inch\\n- 1 medium **onion**, sliced\\n- 1 tsp **oregano**\\n- 2 tbsp cooking oil (pantry staple)\\n- Salt and pepper to taste\\n- Optional: Hot **sauce** for serving\\n\\n### Instructions\\n1. Parboil **potato** cubes in salted water for 5 minutes. Drain thoroughly.\\n2. Heat oil in skillet over medium-high. Add **potatoes** in single layer. Cook 8 minutes undisturbed until golden.\\n3. Flip potatoes, add **onion** slices and **oregano**. Cook 7-8 minutes until onions caramelize.\\n4. Season with salt and pepper. Serve with **sauce** drizzle if desired.\\n\\n## Savory Tomato-Onion Toastie 🥪🔥\\nGrilled sandwich with tangy tomato-onion compote and herbal notes. Comfort food elevated.\\n\\n### Ingredients\\n- 4 slices **bread**\\n- 1 large **tomato**, chopped\\n- ½ **onion**, thinly sliced\\n- 1 tsp **oregano**\\n- 2 tbsp sandwich **sauce** (mayo/mustard)\\n- 1 tbsp butter or oil (pantry staple)\\n- Salt and pepper to taste\\n\\n### Instructions\\n1. Sauté **onion** in 1 tsp oil until soft. Add **tomato** and **oregano**. Cook 5 minutes until thickened. Season with salt and pepper.\\n2. Spread **sauce** on one side of each bread slice.\\n3. Spoon tomato-onion mixture between two bread slices to form sandwich.\\n4. Butter outer bread surfaces. Grill in pan 3-4 minutes per side until crispy and golden.\\n\\n## Oregano Potato Wedges with Dipping Sauce 🥔🌿\\nHerb-crusted roasted potatoes with customizable sauce pairing. Crispy outside, fluffy inside.\\n\\n### Ingredients\\n- 3 medium **potatoes**, cut into wedges\\n- 1 tbsp **oregano**\\n- 2 tbsp cooking oil\\n- Salt and pepper to taste\\n- ¼ cup **sauces** for dipping (ketchup/mayo/mustard blend)\\n\\n### Instructions\\n1. Preheat oven to 425°F (220°C). Soak **potato** wedges in cold water for 10 minutes. Pat dry.\\n2. Toss wedges with oil, **oregano**, salt, and pepper. Arrange on baking sheet.\\n3. Roast 25 minutes. Flip wedges and roast 15 more minutes until crisp.\\n4. Serve hot with assorted **sauces** for dipping.\\n```\"]"
  
  
// `[ \"## Garlic Bread Sticks 🍞🧄\\n\\nTransform your bread into crispy, aromatic garlic bread sticks with minimal ingredients. Perfect as a side or snack.\\n\\n### Ingredients\\n- **4 slices** of bread 🍞  \\n- **2 tablespoons** butter (or olive oil)  \\n- **2 cloves** garlic, finely minced  \\n- **1/4 teaspoon** salt  \\n- **1/4 teaspoon** dried parsley (optional, for color)  \\n\\n### Instructions\\n1. Preheat oven to 375°F (190°C).  \\n2. Cut each bread slice into 3 even strips.  \\n3. Melt butter in a small bowl, then mix in **garlic** and salt.  \\n4. Brush garlic butter generously over both sides of each bread strip.  \\n5. Arrange strips on a baking sheet. Sprinkle with parsley if using.  \\n6. Bake for 10-12 minutes until golden and crisp. Serve warm.  \\n\\n---\\n\\n## Sweet Cinnamon Toast Crisps 🍞🍯\\n\\nCrunchy, caramelized toast crisps with sweet cinnamon warmth—ideal for breakfast or a light dessert.\\n\\n### Ingredients\\n- **4 slices** of bread 🍞  \\n- **2 tablespoons** melted butter  \\n- **1 tablespoon** sugar  \\n- **1 teaspoon** ground cinnamon  \\n\\n### Instructions\\n1. Preheat oven to 350°F (175°C).  \\n2. Cut bread into 1-inch cubes or triangles.  \\n3. Mix **sugar** and **cinnamon** in a small bowl.  \\n4. Toss bread pieces in melted butter until coated, then sprinkle with the cinnamon-sugar mix.  \\n5. Spread bread in a single layer on a baking sheet.  \\n6. Bake for 12-15 minutes until golden and crispy. Cool before serving.  \\n\\n---\\n\\n## Simple Bread Pudding 🍞🥚\\n\\nA comforting, custardy dessert using leftover bread. Requires basic pantry staples.\\n\\n### Ingredients\\n- **4 cups** bread, torn into small pieces 🍞  \\n- **2 large eggs**  \\n- **1.5 cups** milk (any type)  \\n- **3 tablespoons** sugar  \\n- **1 teaspoon** vanilla extract  \\n- **1/4 teaspoon** cinnamon (optional)  \\n- Pinch of salt  \\n\\n### Instructions\\n1. Preheat oven to 350°F (175°C). Grease a small baking dish.  \\n2. Place **bread pieces** in the dish.  \\n3. Whisk **eggs**, milk, sugar, vanilla, cinnamon, and salt in a bowl.  \\n4. Pour mixture over bread, pressing down to soak all pieces. Let sit 10 minutes.  \\n5. Bake for 35-40 minutes until set and golden. Serve warm or chilled.  \\n\\n---\\n\\n## Savory Bread Croutons 🥗🍞\\n\\nHomemade crisp croutons to elevate salads or soups. Ready in minutes!\\n\\n### Ingredients\\n- **3 slices** of bread, cubed 🍞  \\n- **1.5 tablespoons** olive oil or melted butter  \\n- **1/4 teaspoon** garlic powder  \\n- **1/4 teaspoon** dried herbs (oregano, thyme, or rosemary)  \\n- **1/4 teaspoon** salt  \\n\\n### Instructions\\n1. Preheat oven to 375°F (190°C).  \\n2. Toss bread cubes with **olive oil**, garlic powder, herbs, and salt.  \\n3. Spread evenly on a baking sheet.  \\n4. Bake for 10-15 minutes, tossing halfway, until golden and crunchy.  \\n5. Cool completely before storing in an airtight container.  \\n\\n---\\n\\n## Open-Face \\\"Pizza\\\" Toast 🍞🍅\\n\\nQuick single-serve pizza using toasted bread as the base. Customizable with pantry staples.\\n\\n### Ingredients\\n- **1 slice** of bread 🍞  \\n- **1 tablespoon** tomato paste or ketchup  \\n- **2 tablespoons** shredded cheese (cheddar, mozzarella, etc.) 🧀  \\n- **Optional toppings**: dried oregano, chili flakes, sliced olives (if available)  \\n\\n### Instructions\\n1. Toast bread lightly in a toaster or oven.  \\n2. Spread **tomato paste** evenly over the toast.  \\n3. Sprinkle **cheese** and optional toppings.  \\n4. Broil in oven or air fryer at 400°F (200°C) for 3-5 minutes until cheese melts.  \\n5. Slice and serve immediately.\"]` 


async function getRecipe() {
        console.log("getRecipeFunctionCalled") ; 
        let question = ingredients ;
       // let recipe =  await askGemini(question) ;
try{
 //     const result = await askHuggingFace(question);
 //     console.log("Result from Hugging Face: ",(typeof result === 'string' ? result : JSON.stringify(result)));
 const response = await askDeepSeekR1(question) ;
 
 //const response = { response :  "[\"```markdown\\n## Classic Tomato Bruschetta 🍅🍞  \\nBright and refreshing Italian-inspired appetizer featuring toasted bread topped with juicy tomatoes and aromatic herbs.\\n\\n### Ingredients  \\n- **Bread** (4 thick slices, preferably baguette or ciabatta)  \\n- **Tomato** (1 large, finely diced)  \\n- **Onion** (¼ cup, finely chopped)  \\n- **Oregano** (1 tsp dried or 1 tbsp fresh)  \\n- Olive oil (2 tbsp + extra for brushing)  \\n- Salt and pepper to taste  \\n- Optional: 1 garlic clove for rubbing  \\n\\n### Instructions  \\n1. Preheat oven to 400°F (200°C). Brush **bread** slices with olive oil and toast for 5-8 minutes until golden.  \\n2. Combine diced **tomato**, chopped **onion**, **oregano**, 2 tbsp olive oil, salt, and pepper in a bowl.  \\n3. Rub warm toast with garlic (if using). Spoon tomato mixture generously over bread.  \\n4. Serve immediately. *Serves 2.*\\n\\n## Savory Tomato-Onion Melt 🥪🧅  \\nHearty open-faced sandwich with caramelized onions and tomatoes, finished with aromatic oregano.\\n\\n### Ingredients  \\n- **Bread** (2 thick slices)  \\n- **Tomato** (1 medium, sliced)  \\n- **Onion** (1 medium, thinly sliced)  \\n- **Oregano** (½ tsp dried)  \\n- **Sauces** (2 tbsp mayo or garlic aioli)  \\n- Cooking oil (1 tbsp)  \\n- Salt and pepper to taste  \\n- Optional: Cheese (mozzarella or cheddar)  \\n\\n### Instructions  \\n1. Heat oil in a pan over medium-low. Cook **onion** with a pinch of salt for 10-12 minutes until caramelized.  \\n2. Spread **sauces** on **bread**. Top with **tomato** slices and caramelized onions. Sprinkle **oregano**, salt, and pepper.  \\n3. Add cheese if desired. Broil 3-4 minutes until edges are crisp. *Serves 1-2.*\\n\\n## Oregano-Infused Tomato Dip 🥣🌿  \\nWarm, chunky tomato dip perfect for bread slices, infused with fragrant oregano.\\n\\n### Ingredients  \\n- **Tomato** (2 large, diced)  \\n- **Onion** (½ cup, finely chopped)  \\n- **Oregano** (1 tsp dried)  \\n- **Bread** (toasted slices for serving)  \\n- **Sauces** (1 tbsp ketchup or tomato paste)  \\n- Olive oil (1 tbsp)  \\n- Salt and pepper to taste  \\n- Optional: Pinch of red pepper flakes  \\n\\n### Instructions  \\n1. Heat oil in a saucepan. Sauté **onion** until soft (5 minutes).  \\n2. Add **tomato**, **oregano**, **sauces**, salt, pepper, and optional chili flakes. Simmer 10-12 minutes until thickened.  \\n3. Mash lightly with a fork for chunky texture. Serve warm with toasted **bread**. *Serves 2.*\\n\\n## Pantry Pizzettes 🍕🍅  \\nMini open-faced pizzas using bread as the base, topped with zesty tomato sauce and herbs.\\n\\n### Ingredients  \\n- **Bread** (4 slices, sturdy variety)  \\n- **Tomato** (1, finely diced)  \\n- **Onion** (¼ cup, minced)  \\n- **Oregano** (1 tsp dried)  \\n- **Sauces** (3 tbsp marinara or tomato sauce)  \\n- Olive oil for brushing  \\n- Optional toppings: Grated cheese, black olives  \\n\\n### Instructions  \\n1. Preheat oven to 425°F (220°C). Brush **bread** with oil and bake 5 minutes until crisp.  \\n2. Mix **tomato**, **onion**, and **oregano** into **sauces**. Spread over toasted bread.  \\n3. Add optional toppings. Bake 8-10 minutes until edges are golden. *Serves 2.*\\n```\"]" }
 
 console.log("Response received at the frontEnd from DeepSeeekR1✅: " , response ) ;
 console.log("response.response : " , response.response) ;
 console.log("response in string : ",JSON.stringify(response.response)) ;
 //const responseJson = (typeof response ==='string')? await result.json() : response ;
 const  responseJsonString = JSON.stringify(response.response);
 //console.log("Result from DeepSeekR1 : ", responseJsonString );

setRecipe(responseJsonString) ;
    
}catch(err){
 setRecipe('Error: ' + err.message);
}
       
}

  
  return (
   <>
    <div className = "div1  bg-[rgba(221,217,199,0.7)] flex flex-col  h-[95vh] min-h-[710px] w-[90vw] min-w-[490px] border-[3px] border-solid border-[rgba(221,217,199,0.9)] rounded-[3px] shadow-inner py-[1px] px-[1px] -px-[1px]" >
     <header className = "header bg-[rgba(213,201,155,0.9)] flex flex-row justify-center items-center gap-[4px] shadow-lg rounded-[3px] min-h-[70px] w-[100%]"><img className = "appLogo h-[70px] w-[70px]" src = 'logo/cooking.png' alt = "Logo" /><h1 className = " font-semibold text-[35px] text-[rgba(125,120,95,1)]">Chef Claude</h1></header>
     <Form setIngredients = {setIngredients}/>
     <br/>
     {(ingredients.length > 0 )? <h1 className = "text-[20px]  text-[rgba(125,120,95,1)] mx-[2px] font-[700] ">Ingredients on Hand : </h1> : null }
     <ul className = " list-disc list-inside marker:text-[#47463f] ">
     {ingredients.map((ingredient , index)=>{
       return <li key = {index}  className = "text-[18px] text-[rgba(125,120,95,1)] font-sans font-[520] ">{ingredient}</li>
     
       })
     } 
      </ul>
    <br/>

   {ingredients.length > 0
     &&
    <div className = "flex flex-col justify-center min-h-[80px] w-[98%]">
    <h1 className = "text-[18px] text-[rgba(125,120,95,1)] font-[500] mx-[2px]">Ready for a recipe : <span className = "text-[16px]">Get the recipe for the list of ingredients we have .</span></h1>
    <div className = "flex flex-row justify-center">
    <button onClick = {getRecipe} onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMouseLeave} onMouseDown = {handleMouseDown} onMouseUp = {handleMouseUp} className = "bg-[rgba(213,201,155,0.9)] text-[rgba(125,120,95,1)] font-[500] min-w-[120px] w-[120px] h-[35px] border-[2px] border-solid border-[rgba(125,120,95,1)] shadow-md  rounded-[7px]">Get a Recipe</button>
    </div>
    </div>
    }
    
     {recipe.length>0 && <div><Recipe content = {`${recipe}`} /></div>} 
     {/* {recipe.length>0 && <div>{(async function(){return await recipe.json()})()}</div>} */}
  



    </div>   
   
   </>
  );
}





//  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               app/page.js
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>