import React , { useState, useEffect } from "react"; 

import 'bulma/css/bulma.css';


export default function AddFoodForm(props) {

    const addFood = props.addFoodHandler

    const initialState =   {
        name: "",
        calories: null,
        image: "",
        quantity: 0
    }

    const [formState, setFormState] = useState( initialState )

    

    function handleChange(event){
        setFormState( { ...formState, [event.target.name]: event.target.value } )
    }


    function handleOnSubmit(event){
      event.preventDefault();
      console.log(formState);

      addFood(formState)
      setFormState( initialState )
    }


    return (
        <form onSubmit={handleOnSubmit} >
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input name="name" value={formState.name} onChange={handleChange} class="input" type="text" placeholder="e.g. Tofu"/>
                </div>
            </div>
            <div class="field">
                <label class="label">Number of calories</label>
                <div class="control">
                    <input name="calories" value={formState.calories} onChange={handleChange} class="input" type="number" placeholder="e.g. 10"/>
                </div>
            </div>
            <div class="field">
                <label class="label">Image</label>
                <div class="control">
                    <input name="image" value={formState.image} onChange={handleChange} class="input" type="url" placeholder="e.g. https://i.imgur.com/eTmWoAN.png"/>
                </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-link">Submit</button>
            </div>
        </form>

    )

}
