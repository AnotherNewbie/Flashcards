import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { readDeck } from "../utils/api";

import ErrorMessage from "./ErrorMessage";

export default function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const ac = new AbortController();
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

  const deckList = deck.cards.map((card) => (
    <div className="Container" key={card.id}>
      <div className="row">{card.id}</div>
      <div className="row">
        <div className="col">Front: {card.front}</div>
        <div className="col">Back: {card.back}</div>
      </div>
    </div>
  ));

  return <>{deckList}</>;
}
