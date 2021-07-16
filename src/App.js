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
  //MAIN FOODLIST STATE
  let [foodData, setFoodData] = useState(foodsArray);


  //ACTION STATES
  let [displayForm, setdisplayForm] = useState(false);
  let [displayResults, setDisplayResults] = useState(0);



  //ADD FOOD FUNCTIONS
  let [foodDataWithNew, setWithNew] = useState(foodsArray);

  function addFood(newFood) {
    if(foodDataWithNew.some((el) => el.name === newFood.name)) {
      alert('This food already exists');
      return false;
    } else {
      let newFoodsArray = [...foodDataWithNew, newFood]
      console.log("new foods: ", newFoodsArray)
      setWithNew(newFoodsArray)
      setdisplayForm(!displayForm)
    }

  }

  function cancelForm() {
    setdisplayForm(!displayForm)
  }

  useEffect(() => setFoodData(foodDataWithNew), [foodDataWithNew])



  
  //SEARCH FUNCTION
  let [searchResult, setSearchResult] = useState([]);

  function searchFood(foodSearch) {
    if(foodSearch === "") {
      console.log("empty search")
      setDisplayResults(0)
    }
    else {
      let counter = displayResults + 1;
      setDisplayResults(counter)

      let newArr = foodData.filter(foodObject => foodObject.name.toLowerCase().includes(foodSearch.toLowerCase()))
      setSearchResult(newArr) 
    }
  }


  
  //JOURNAL FUNCTIONS
  let [journalData, setJournal] = useState([])


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

      {(!displayForm) && 
            <button class="button" onClick={() => setdisplayForm( !displayForm )} > Add new food </button>
      }

      {(displayForm) && <AddFoodForm addFoodHandler={addFood} cancelFormHandler={cancelForm}/>}

      <Search searchFoodHandler={searchFood} />


      <div class="columns">
        <div class="column is-two-thirds">
          {(displayResults > 0) &&
            <ul class="food-list-normal">
              {searchResult.map((foodEl, index) => {
                return (
                <li key={index}>
                  <FoodBox foodObject={foodEl} quantityHandler= {addToJournal}/>
                </li>
                )
              })}
            </ul>
          }
        
          {(displayResults === 0) &&
            <ul class="food-list-normal">
              {foodData.map((foodEl, index) => {
                return (
                  <li key={index}>
                    <FoodBox foodObject={foodEl} quantityHandler=   {addToJournal}/>
                  </li>
                )
              })}
            </ul>
          }
        </div>
        <div class="column">
          <FoodJournal journalArray={journalData}/>
        </div>
      </div>

    </div>
  );
}

export default App;
