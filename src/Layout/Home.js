import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { listDecks } from "../utils/api";

import DeckCard from "./DeckCard";

export default function Home() {
    const [decks, setDecks] = useState([{cards:[]}]);
    useEffect(() => {
        async function loadDecks() {
            const response = await listDecks();                      
            setDecks(response);            
        }        
        loadDecks();
    },[]);

    const deckList = decks.map((deck) =>(                
        <DeckCard key={`deck-${deck.id}`} title={deck.name} length={deck.cards.length} description={deck.description} id={deck.id}/>
    ));
    
    
    return(
        <>    
            <Link to="/decks/new"><button type="button" className="btn btn-secondary">CreateNew</button></Link>
            <div className="Container">{deckList}</div>                   
        </>
    )
}