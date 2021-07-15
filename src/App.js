import React , { useState, useEffect } from "react";

import 'bulma/css/bulma.css';
import './App.css';

import foods from './foods.json';
import FoodBox from "./components/FoodBox";
import AddFoodForm from "./components/AddFoodForm";
import Search from "./components/Search";
import FoodJournal from "./components/FoodJournal";
const foodsArray = [...foods];



function App() {

  const [foodData, setFoodData] = useState(foodsArray);
  const [journalData, setJournal] = useState([])

  const [action, setAction] = useState(false)



  function addFood(newFood) {
    const updatedFoodList = [newFood, ...foodData];
    setFoodData(updatedFoodList)
    setAction(!action)
  }

  function cancelForm() {
    setAction(!action)
  }

  function searchFood(foodSearch) {
    console.log("foodSearch", foodSearch)
    let newArr = foodData.filter(foodObject => 
      foodObject.name.toLowerCase().includes(foodSearch.toLowerCase())
    )
    setFoodData(newArr) 
  }

  function addToJournal(foodObject) {

    let journalArray = [...journalData]

    if(journalArray.some((el) => el.name === foodObject.name)) {
      let index = journalArray.findIndex((el) => el.name === foodObject.name)
      journalArray[index] = {...journalArray[index] , quantity: (parseInt(journalArray[index].quantity) + parseInt(foodObject.quantity))}
      setJournal(journalArray)
    } 
    else {
      journalArray = [...journalData, foodObject]
      setJournal(journalArray)
    }
    
  }



  return (
    <div className="App">

      {(!action) && 
            <button class="button" onClick={() => setAction( !action )} > Add new food </button>
      }

      {(action) && <AddFoodForm addFoodHandler={addFood} cancelFormHandler={cancelForm}/>}

      <Search searchFoodHandler={searchFood} />


      <div class="columns">
        <div class="column is-two-thirds">
        <ul class="food-list">
          {foodData.map((foodEl, index) => {
            return (
              <li key={index}>
                <FoodBox foodObject={foodEl} quantityHandler={addToJournal}/>
              </li>
            )
          })}
        </ul>
        </div>
        <div class="column">
          <FoodJournal journalArray={journalData}/>
        </div>
      </div>

    </div>
  );
}

export default App;
