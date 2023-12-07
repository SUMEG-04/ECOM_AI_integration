import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

const CartAmountToggle = ({quantity,setDecrease,setIncrease}) => {
  return (
    <div className='addtocart-button'>
      <div className="amount-toggle">
        <button className='chng-amnt' onClick={()=>setDecrease()}><FaMinus/></button>
        <div className="amount-style">{quantity}</div>
        <button className='chng-amnt' onClick={()=>setIncrease()}><FaPlus/></button>
      </div>
    </div>
  )
}

export default CartAmountToggle
