import React from 'react'
import cheddar from "../assets/images/chedar.jpg"
import Checkbox from './checkbox/Checkbox'

const Ingredients = () => {
  return (
    <div className="flex justify-between items-center">
      <div className='flex'>
        <img src={cheddar} alt="Ingrediente adicional" className="w-20 mr-4 px-2 bg-white-100 rounded-lg shadow-lg shadow-black-50/50" />
        <div className='flex flex-col justify-center'>
          <h4 className="text-base font-bold sm:text-base">Cheddar</h4>
          <small className='text-sm'>10g</small>
        </div>
      </div>
      <div className='relative'>
        <strong className="text-black-200">R$ 1,00</strong>
        <Checkbox />
      </div>
    </div>
  )
}

export default Ingredients