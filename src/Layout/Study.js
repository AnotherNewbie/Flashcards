import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import StudyCard from "./StudyCard";
import { readDeck, readCard } from "../utils/api";
import ErrorMessage from "./ErrorMessage";

export default function Study() {
  const { deckId } = useParams();
  const [card, setCard] = useState();
  const [deck, setDeck] = useState({ cards: [] });
  const [error, setError] = useState(undefined);
  const [index, setIndex] = useState(0);
  let cardId = null;
  const ac = new AbortController();
  let cardIds = [];

  useEffect(() => {
    readDeck(deckId, ac.signal)
      .then((d) => {
        setDeck(d);        
        return () => ac.abort();
      })
      .catch((error) => setError(error));
  }, []);

  cardIds = deck.cards.map((card) => card.id);
  console.log(cardIds);
  cardId = cardIds[index];

  

  useEffect(() => {
    console.log(`cardId ${cardId}`);
    if (!cardId) {      
      return;
    }
    readCard(cardId, ac.signal)
      .then((c) => {
        console.log(`updating card: ${JSON.stringify(c, null, 4)}`);
        setCard(c);        
        return () => ac.abort();
      })
      .catch((error) => setError(error));
  }, [cardId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  
  
  const handleNext = async () =>
  { 
    console.log("handle next called");
    setIndex(cardIds.findIndex((id)=> id = card.id))
    setIndex(index + 1)
    cardId = cardIds[index];
    console.log("cardId: " + cardId)    
  }

  

  console.log(`card: ${JSON.stringify(card, null, 4)}`);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>DeckID: {deckId}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            current
          </li>
        </ol>
      </nav>
      {card && <StudyCard key={`card-${card.id}`} totalCards={cardIds.length} deckName={deck.name} card={card} handleNext={handleNext} />}
    </>
  );
}
