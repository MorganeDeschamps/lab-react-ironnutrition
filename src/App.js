import React , { useState, useEffect } from "react";

import 'bulma/css/bulma.css';
import './App.css';

import foods from './foods.json';
import FoodBox from "./components/FoodBox";
import AddFoodForm from "./components/AddFoodForm";
const foodsArray = [...foods];



function App() {

  const [foodData, setFoodData] = useState(foodsArray);


  function addFood(newFood) {
    const updatedFoodList = [newFood, ...foodData];
    setFoodData(updatedFoodList)
  }








  return (
    <div className="App">

      <AddFoodForm addFoodHandler={addFood}/>

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
