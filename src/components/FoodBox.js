import React , { useState, useEffect } from "react";

import 'bulma/css/bulma.css';



export default function FoodBox(props) {

  const [foodWithQuantity, setQuantity] = useState(props.foodObject)


  function handleChange(event) {
    const newQuantity = event.target.value
    setQuantity({ ...foodWithQuantity, quantity: newQuantity })
  } 

  function handleSubmit(event) {
    event.preventDefault();
    props.quantityHandler(foodWithQuantity)
    setQuantity(props.foodObject)
  }




  return (
        
    <div className="box">
        <article className="media">
            <div className="media-left">
                <figure className="image is-64x64">
                  <img src={foodWithQuantity.image} alt={foodWithQuantity.name} />
                </figure>
            </div>
            <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{foodWithQuantity.name}</strong> <br />
                    <small>{`${foodWithQuantity.calories} cal`}</small>
                  </p>
                </div>
            </div>
            <div className="media-right">
                <form onSubmit={handleSubmit} className="field has-addons">
                  <div className="control">
                    <input className="input" type="number" value={foodWithQuantity.quantity} onChange={handleChange}/>
                  </div>
                  <div className="control">
                    <button type="submit" className="button is-info">
                      +
                    </button>
                  </div>
                </form>
            </div>
        </article>
    </div>
  )

}