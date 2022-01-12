import React from "react";
import CardForm from "./CardForm";

const [front, setFront] = useState();
const [back, setBack] = useState();

const handleFrontChange = (event) => setFront(event.target.value);
const handleBackChange = (event) => setBack(event.target.value);    

export function AddCardHandler(){
    
}

export default function AddCard() {

    return(
        <>
            {/* <CardForm /> */}
            <form>
               <label htmlFor="front">
                Enter front of card:
                <textarea id="front" cols="50" rows="5" maxlength="250" name="front" onChange={handleFrontChange} value={front}>{front}</textarea>
               </label>
               <label htmlFor="back">
                Enter back of card:
                <textarea id="back" cols="50" rows="5" maxlength="250" name="back" onChange={handleBackChange} value={back} >{back}</textarea>
               </label>
            </form> 
        </>
    )
}