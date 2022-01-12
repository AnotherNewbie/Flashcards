import React, { useState, useEffect } from "react";
import CardForm from "./CardForm";
import { readCard } from "../utils/api";
import ErrorMessage from "./ErrorMessage";
import { useParams } from "react-router-dom";

export default function EditCard(props) {
  // const {cardId} = props;
  const [card, setCard] = useState({ id: "", front: "", back: "", deckId: "" });
  const ac = new AbortController();
  const [error, setError] = useState(undefined);
  const { cardId, deckId } = useParams();
  const [front, setFront] = useState();
  const [back, setBack] = useState();

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  useEffect(() => {
    console.log(`cardId ${cardId}`);
    if (!cardId) {
      return;
    }
    readCard(cardId, ac.signal)
      .then((c) => {
        console.log(`updating card: ${JSON.stringify(c, null, 4)}`);
        setCard(c);
        setFront(card.front);
        setBack(card.back);
        return () => ac.abort();
      })
      .catch((error) => setError(error));
  }, [cardId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      {/* <CardForm cardId={cardId} frontIN={card.front} backIN={card.back} deckId={deckId}/> */}
      <form>
        <label htmlFor="front">
          Enter front of card:
          <textarea
            id="front"
            cols="50"
            rows="5"
            maxLength="250"
            name="front"
            onChange={handleFrontChange}
            value={card.front}
          >            
          </textarea>
        </label>
        <label htmlFor="back">
          Enter back of card:
          <textarea
            id="back"
            cols="50"
            rows="5"
            maxLength="250"
            name="back"
            onChange={handleBackChange}
            value={card.back}
          >            
          </textarea>
        </label>
      </form>
    </>
  );
}
