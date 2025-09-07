'use client'
     

import Image from "next/image";
import  React from "react";
import Form from "./components/Form/page.js";
import {useState, useEffect} from 'react' ;
import { handleMouseEnter , handleMouseLeave  , handleMouseDown , handleMouseUp } from './components/interactionFunction';
import Recipe from "./components/recipe/page" ;


export default function Home() {
const [ingredients, setIngredients] = useState([]); // State to store the ingredients
const [recipe , setRecipe] = useState("") ;
const [searching , setSearching] = useState(false) ; 


async function getRecipe() {
        console.log("getRecipeFunctionCalled") ; 
        //let ingredientsFromUser = ingredients ;
        // const recipe =  await askGemini(ingredientsFromUser) ;
        // console.log("Recipe received at the frontEnd from Gemini✅: " , recipe ) ;
        setSearching(true) ; 
        const ingredientString = ingredients.map(i => i.trim()).join(',') ; 
        
    try{
      const response = await fetch(`/api/getRecipe?ingredients=${ingredientString}`);
      const data = await response.json();
      setRecipe(data.recipe);
      setSearching(false) ;
    }catch(error){
      console.error('Error fetching recipe:', error);
      setRecipe('Error fetching recipe');
      setSearching(false) ;
    }

// try{
//  const response = await askDeepSeekR1(ingredientsFromUser) ;
  
//  console.log("Response received at the frontEnd from DeepSeeekR1✅: " , response ) ;
//  console.log("response.response : " , response.response) ;
//  console.log("response in string : ",JSON.stringify(response.response)) ;
//  //const responseJson = (typeof response ==='string')? await result.json() : response ;
//  const  responseJsonString = JSON.stringify(response.response);
//  //console.log("Result from DeepSeekR1 : ", responseJsonString );

// setRecipe(responseJsonString) ;
    
// }catch(err){
//  setRecipe('Error: ' + err.message);
// }
       
}

  
  return (
   <>
    <div className = "div1  bg-[rgba(221,217,199,0.7)] flex flex-col  h-[95vh] min-h-[710px] w-[90vw] min-w-[490px] border-[3px] border-solid border-[rgba(221,217,199,0.9)] rounded-[3px] shadow-inner py-[1px] px-[1px] -px-[1px] overflow-y-auto" >
     <header className = "header bg-[rgba(213,201,155,0.9)] flex flex-row justify-center items-center gap-[4px] shadow-lg rounded-[3px] min-h-[70px] w-[100%]"><Image height={70} width={70} className = "appLogo h-[70px] w-[70px]" src = '/logo/cooking.png' alt = "Logo" /><h1 className = " font-semibold text-[35px] text-[rgba(125,120,95,1)]">Chef Claude</h1></header>
     <Form setIngredients = {setIngredients}/>
     <br/>
     {(ingredients && ingredients.length > 0 )? <h1 className = "text-[20px]  text-[rgba(125,120,95,1)] mx-[2px] font-[700] ">Ingredients on Hand : </h1> : null }
     <ul className = " list-disc list-inside marker:text-[#47463f] ">
     {ingredients.map((ingredient , index)=>{
       return <li key = {index}  className = "text-[18px] text-[rgba(125,120,95,1)] font-sans font-[520] ">{ingredient}</li>
     
       })
     } 
      </ul>
    <br/>

   {(ingredients && ingredients.length > 0)
     &&
    <div className = "flex flex-col justify-center min-h-[80px] w-[98%]">
    <h1 className = "text-[18px] text-[rgba(125,120,95,1)] font-[500] mx-[2px]">Ready for a recipe : <span className = "text-[16px]">Get the recipe for the list of ingredients we have .</span></h1>
    <div className = "flex flex-row justify-center">
    <button onClick = {getRecipe} onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMouseLeave} onMouseDown = {handleMouseDown} onMouseUp = {handleMouseUp} className = "bg-[rgba(213,201,155,0.9)] text-[rgba(125,120,95,1)] font-[500] min-w-[120px] w-[120px] h-[35px] border-[2px] border-solid border-[rgba(125,120,95,1)] shadow-md  rounded-[7px]">Get a Recipe</button>
    </div>
    </div>
    }
    
    <br/>
    
     {searching && <div className = "text-[16px] text-[rgba(125,120,95,1)] font-[500] mx-[2px]">Searching for the best recipes for you... 😋🔥🍳🍝🥗🌶️🧀🍅🌿🍞🥔🍋🥑🔥😋</div>}  
    
     {(recipe && recipe.length>0) && <div><Recipe content = {`${recipe}`} /></div>} 
     {/* {recipe.length>0 && <div>{(async function(){return await recipe.json()})()}</div>} */}

  



    </div>   
   
   </>
  );
}




