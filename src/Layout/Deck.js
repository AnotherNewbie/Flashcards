import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { readDeck, deleteCard } from "../utils/api";

import ErrorMessage from "./ErrorMessage";

export default function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const [error, setError] = useState(undefined);
  const ac = new AbortController();

  useEffect(() => {    
    readDeck(deckId, ac.signal)
      .then((d) => {
        setDeck(d);
        return () => ac.abort();
      })
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const deleteHandler = (cardId) => {
    if(window.confirm("Do you really want to delete this card?")){
      deleteCard(cardId, ac.signal)
    }      
  }

  const deckList = deck.cards.map((card) => (
    <div className="Container" key={card.id}>
      <div className="row">
        <div className="col">Front: {card.front}</div>
        <div className="col">Back: {card.back}</div>
      </div>
      <div className="row">
        <div className="col">          
          <button className="btn btn-danger float-right" onClick={() => deleteHandler(card.id)}>Delete</button>
          <Link to={`/decks/${deckId}/cards/${card.id}/edit`}><button className="btn btn-secondary float-right">Edit</button></Link>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <h2>Cards</h2>
      {deckList}
    </>
  );
}
