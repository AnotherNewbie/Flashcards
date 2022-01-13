import React, { useState, useEffect } from "react";
import { readCard, updateCard } from "../utils/api";
import ErrorMessage from "./ErrorMessage";
import { useParams } from "react-router-dom";

export default function EditCard(props) {
  const { cardId, deckId } = useParams();

  const initialState = {
    front: "",
    back: "",
    id: cardId,
    deckId: deckId,
  };

  const [formData, setFormData] = useState({ ...initialState });

  const [card, setCard] = useState({ id: "", front: "", back: "", deckId: "" });
  const ac = new AbortController();
  const [error, setError] = useState(undefined);

  const SubmitHandler = (event) => {
    event.preventDefault();
    console.log("Submitted:", formData);
    updateCard(formData, ac.signal).then(() => {
      return () => ac.abort();
    });
  };

  const handleChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  useEffect(() => {
    console.log(`cardId ${cardId}`);
    if (!cardId) {
      return;
    }
    readCard(cardId, ac.signal)
      .then((c) => {
        console.log(`updating card: ${JSON.stringify(c, null, 4)}`);
        setCard(c);
        initialState.front = c.front;
        initialState.back = c.back;
        initialState.id = c.id;
        initialState.deckId = c.deckId;
        setFormData({ ...initialState });
        return () => ac.abort();
      })
      .catch((error) => setError(error));
  }, [cardId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <form onSubmit={SubmitHandler}>
        <label htmlFor="front">
          Enter front of card:
          <textarea
            id="front"
            cols="50"
            rows="5"
            maxLength="250"
            name="front"
            onChange={handleChange}
            value={formData.front}
          ></textarea>
        </label>
        <label htmlFor="back">
          Enter back of card:
          <textarea
            id="back"
            cols="50"
            rows="5"
            maxLength="250"
            name="back"
            onChange={handleChange}
            value={formData.back}
          ></textarea>
        </label>
        <div className="row">
          <div className="col">
            <button type="Submit" className="btn btn-primary float-right">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
