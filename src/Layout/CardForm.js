import React from "react";
import { useState } from "react";

export default function CardForm(props){
    const {cardId, frontIN, backIN, deckId} = props;    
    const [front, setFront] = useState(frontIN);
    const [back, setBack] = useState(backIN);

    const handleFrontChange = (event) => setFront(event.target.value);
    const handleBackChange = (event) => setBack(event.target.value);
    
    console.log("front: " + front);

    return(
        <>
           <form>
               <label htmlFor="front">
                Enter front of card:
                <input id="front" type="text" name="front" onChange={handleFrontChange} value={front} />
               </label>
               <label htmlFor="back">
                Enter back of card:
                <input id="back" type="text" name="back" onChange={handleBackChange} value={back} />
               </label>
            </form> 
        </>)
}