import React , { useState, useEffect } from "react";

import 'bulma/css/bulma.css';


export default function Search(props) {

    const [formState, setFormState] = useState("")

    const searchFood = props.searchFoodHandler

    

    function handleSearch(event) {
        event.preventDefault();
    } 

    function handleChange(event) {
        event.preventDefault();
        const search = event.target.value
        setFormState(search) 
    } 


    useEffect(() => searchFood(formState), [formState]) // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <form onSubmit={handleSearch}>
            <div class="field">
                <input name="search" value={formState} onChange={handleChange} class="input" type="text" placeholder="e.g. Tofu"/>
            </div>
        </form>
    )
}