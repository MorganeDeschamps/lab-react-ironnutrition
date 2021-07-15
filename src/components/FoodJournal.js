import React , { useState, useEffect } from "react";

import 'bulma/css/bulma.css';



export default function FoodJournal(props) {

  const journalArray = props.journalArray

  const [journalData, setJournal] = useState([])
  const [totalCalories, setTotal] = useState(0)

  function howManyCal(calories, quantity) {
    return calories * quantity;
  }


  function addToJournal(journalArray) {
      setJournal(journalArray)
  }

  function calculateTotal(journalData) {
    let cal = 0;
    journalData.map((foodObject) => {
        cal += howManyCal(foodObject.calories, foodObject.quantity)
        return setTotal(cal)
      })
  } 


  useEffect(() => addToJournal(journalArray), [journalArray]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => calculateTotal(journalData), [journalData]) // eslint-disable-line react-hooks/exhaustive-deps



  return (
    <div class="column content">
        <h2 class="subtitle">Today's foods: </h2>
        <ul>
            {journalData.map((foodObject) => {
                const totalCalories = howManyCal(foodObject.calories, foodObject.quantity);
                return (<li key={foodObject.name}>{`${foodObject.quantity} ${foodObject.name} = ${totalCalories} cal`}</li>)
            })}
        </ul>
        <strong>{`Total: ${totalCalories} cal`}</strong>
    </div>
  )

}
        