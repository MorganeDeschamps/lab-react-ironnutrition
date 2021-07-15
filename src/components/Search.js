import React , { useState, useEffect } from "react";

import 'bulma/css/bulma.css';


export default function Search(props) {

    const [formState, setFormState] = useState("")

    const searchFood = props.searchFoodHandler

    

    function handleSearch(event) {
        event.preventDefault();
        const search = event.target.value
        setFormState(search)

        console.log("searchValue: ", search)      
    } 


    useEffect(() => searchFood(formState), [formState]) // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <form onSubmit={handleSearch}>
            <div class="field">
                <input name="search" value={formState} onChange={handleSearch} class="input" type="text" placeholder="e.g. Tofu"/>
            </div>
        </form>
    )
}