import React from 'react'

function CardItem({ title, description, Icon }) {
  return (
    <div className=''>
        <div className=''>
         <div>
            <Icon />
            </div>   
        <h2 className='text-red-900'>{title}</h2>
        <p>{description}</p>
        </div>
    </div>
  )
}

export default CardItem
