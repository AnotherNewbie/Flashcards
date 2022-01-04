import { Link, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Deck from "./Deck";
import DeckCard from "./DeckCard";

export default function Home() {
    const [decks, setDecks] = useState([]);
    useEffect(() => {
        async function loadDecks() {
            const response = await fetch("http://localhost:5000/decks?_embed=cards");
            const deckList = await response.json();             
            setDecks(deckList);            
        }        
        loadDecks();
    },[]);

    const deckList = decks.map((deck) =>(
        <DeckCard key={deck.id} title={deck.name} length={deck.cards.length -1} description={deck.description} id = {deck.id} />
    ));

    return(
        <>    
            <Link to="/decks/new">CreateNew</Link>            
            <Switch>
                {deckList}<Route path="/decks/:deckId">
                <Deck decks={decks}/>
                </Route>
            </Switch>


        </>
    )
}