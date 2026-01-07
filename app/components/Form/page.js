'use client'

import React from 'react'
import {
  handleMouseEnter,
  handleMouseLeave,
  handleMouseDown,
  handleMouseUp,
} from '../InteractionsUI-UX/interactionFunction'

const Form = (props) => {
  const { setIngredients } = props
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const ingredientName = formData.get('ingredientName')
    if (ingredientName.trim() !== '')
      setIngredients((prevIngredients) => [...prevIngredients, ingredientName]) // Add the new ingredient to the list
    //We should use formData.getAll() if any field is returning an array of values
    // OR alternatively we can also use the Object.fromEntries() method :
    //const formData = Object.fromEntries(new FormData(event.target));
    event.target.reset()
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        method='POST'
        className='form flex flex-row justify-center items-center min-h-[50px] w-[100%] my-[10px] gap-[3px] '
      >
        <input
          type='text'
          name='ingredientName'
          placeholder='eg. Tomato'
          className='flex-1 bg-[rgb(242,241,237)] h-[40px] min-w-[250px] max-w-[500px] border-[rgb(110,110,108)] border-[3px]  rounded-[8px] px-[3px] font-semibold  shadow-md '
        />
        <button
          type='submit'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className='flex flex-row flex-1 items-center gap-[3px] bg-[rgba(213,201,155,0.9)] text-[rgba(125,120,95,1)] font-semibold text-[20px] border-[2px] min-h-[40px] min-w-[200px] max-w-[200px] rounded-[5px] px-[5px] py-[2px] shadow-md '
        >
          <img src='/logo/plus.png' alt='+' className='h-[18px] w-[18px] ' />
          <h1 className='font-semibold text-[20px] text-[rgba(125,120,95,1)]'>
            Add Ingredients
          </h1>
        </button>
      </form>
    </div>
  )
}

export default Form
