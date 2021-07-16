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

  let [foodData, setFoodData] = useState(foodsArray);

  let [foodDataWithNew, setWithNew] = useState(foodsArray);


  let [journalData, setJournal] = useState([])

  let [action, setAction] = useState(false)



  //ADD FOOD FUNCTIONS
  function addFood(newFood) {
    let foodsArray = [...foodDataWithNew]
    if(foodsArray.some((el) => el.name === newFood.name)) {
      alert('This food already exists');
      return false;
    } else {
      foodsArray = [...foodDataWithNew, newFood]
      setWithNew(foodsArray)
      setAction(!action)
    }

  }

  function cancelForm() {
    setAction(!action)
  }

  useEffect(() => setFoodData(foodDataWithNew), [foodDataWithNew]) // eslint-disable-line react-hooks/exhaustive-deps



  //SEARCH FUNCTION

  function searchFood(foodSearch) {
    let safeCopy = [...foodData];
    let safeCopyNew = [...foodDataWithNew];
      
    let newArr = safeCopyNew.filter(foodObject => foodObject.name.toLowerCase().includes(foodSearch.toLowerCase()))
    console.log("newArr: ", newArr)
    setFoodData(newArr) 
  }





  //JOURNAL FUNCTIONS

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
