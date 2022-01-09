import { useState, useEffect } from "react";

export default function StudyCard(props) {
  const { totalCards, deckName, card, handleNext } = props;
  const { front, back } = card;
  const [isFront, setIsFront] = useState(true);

  function handleFlip(){
    setIsFront (!isFront);
  }
  

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
        {!isFront && <button type="button" className="btn btn-secondary" onClick={handleNext}>Next</button>}
      </div>
    </>
  );
}
