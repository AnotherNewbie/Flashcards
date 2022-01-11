import React from "react";
import { useState } from "react";

export default function CardForm(props){
    const {frontIN, backIN} = props;
    // const [id, setId] = useState();
    const [front, setFront] = useState(frontIN);
    const [back, setBack] = useState(backIN);
    // const [deckId, setDeckId] = useState();

    // const handleIdChange = (event) => setId(event.target.value);
    const handleFrontChange = (event) => setFront(event.target.value);
    const handleBackChange = (event) => setBack(event.target.value);
    // const handleDeckIdChange = (event) => setDeckId(event.target.value);

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