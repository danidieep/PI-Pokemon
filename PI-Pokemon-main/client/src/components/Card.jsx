import React, { Fragment } from 'react'
import './Card.css'

export default function Card({img, name, types}){
    // let type = types.join(', ')
    // console.log(types)
   

    return (
        <Fragment  >
            <div className='cards'>
                <img src={img} alt='img' width='200px' height='200px' />
                <div className='info'>
                <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
                <h2>{typeof types[0] === 'string' ? types[0].charAt(0).toUpperCase() + types[0].slice(1) : types[0]?.name.charAt(0).toUpperCase() +
              types[0].name.slice(1) + ' - '}{
                typeof types[1] === 'string' ? " - " + types[1]   :  types[1]?.name
              }</h2>
              </div>
            </div>
        </Fragment>
    )
}