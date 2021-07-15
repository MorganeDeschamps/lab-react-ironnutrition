import React , { useState, useEffect } from "react";

import 'bulma/css/bulma.css';
import './App.css';

import foods from './foods.json';
import FoodBox from "./components/FoodBox";
import AddFoodForm from "./components/AddFoodForm";
import Search from "./components/Search";
const foodsArray = [...foods];



function App() {

  const [foodData, setFoodData] = useState(foodsArray);

  const [action, setAction] = useState(false)


  function addFood(newFood) {
    const updatedFoodList = [newFood, ...foodData];
    setFoodData(updatedFoodList)
    setAction(!action)
  }

  function searchFood(foodSearch) {
    console.log("foodSearch", foodSearch)
    let newArr = foodData.filter(foodObject => 
      foodObject.name.toLowerCase().includes(foodSearch.toLowerCase())
    )
    setFoodData(newArr) 
  }



  return (
    <div className="App">

      {(!action) && 
            <button class="button" onClick={() => setAction( !action )} > Add new food </button>
      }

      {(action) && <AddFoodForm addFoodHandler={addFood}/>}

      <Search searchFoodHandler={searchFood} />

        <ul class="food-list">
          {foodData.map((foodEl, index) => {
            return (
              <li key={index}>
                <FoodBox foodObject={foodEl} />
              </li>
            )
          })}
        </ul>

    </div>
  );
}

export default App;
