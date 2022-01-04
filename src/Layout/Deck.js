import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

import { readDeck } from "../utils/api";

import ErrorMessage from "./ErrorMessage";

export default function Deck() {
    const {deckId} = useParams();    
    const [deck, setDeck] = useState({});
    const [error, setError] = useState(undefined);

    // useEffect(()=> {
    //     const ac = new AbortController();        
    //     readDeck(deckId, ac.signal).then(setDeck).catch(setError);     

    //     return () => ac.abort();
    // },[]);

    // if(error) {
    //     return <ErrorMessage error={error} />;
    // }
    
    
    // useEffect(() => {
    //     async function loadCards() {
    //         const response = await readDeck(deckId);                      
    //         setDeck(response);            
    //     }        
    //     loadCards();
    // },[]);

    
    // const deckList = deck.cards.map((card) => (
    //      <div>
    //          <p>{card.id}</p><p>Front: {card.front}</p><p>Back: {card.back}</p>
    //      </div>
    // ));

    return(
        <>
        {/* {deckList} */}        
        </>
    )
}