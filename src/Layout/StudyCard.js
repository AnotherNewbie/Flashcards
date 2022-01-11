import React, { useState } from "react";
import { AddCardHandler } from "./AddCard";

export default function StudyCard(props) {
  const { totalCards, deckName, card, handleNext } = props;
  const { front, back } = card;
  const [isFront, setIsFront] = useState(true);

  function handleFlip(){
    setIsFront (!isFront);
  }
  
if(totalCards > 2){
  return (
    <>
      <h1>Study: {deckName} </h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Card of {totalCards}</h2>
          </div>
        </div>
      </div>
      <div className="container">
        <p>{isFront ? front : back}</p>
        <button type="button" className="btn btn-secondary" onClick={handleFlip}>Flip</button>
        {!isFront && <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>}
      </div>
    </>
  );
} else {
  return(
    <>
      <h1>Study: {deckName} </h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <p>You need at least 3 cards to study. There are {totalCards} cards in this deck.</p>
            <button type="button" className="btn btn-primary" onClick={AddCardHandler}>Add Cards</button>
          </div>
        </div>
      </div>
    </>
  )
}
}
