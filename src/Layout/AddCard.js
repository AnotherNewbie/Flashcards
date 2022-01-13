import React, { useState } from "react";
import { createCard } from "../utils/api";

export default function AddCard() {
  const initialState = {
    front: "",
    back: "",
    deckId: "",
  };

  const [formData, setFormData] = useState({ ...initialState });
  const ac = new AbortController();
  const [error, setError] = useState(undefined);

  const SubmitHandler = (event) => {
    event.preventDefault();
    console.log("Submitted:", formData);
    createCard(formData.deckId, formData, ac.signal).then(() => {
      return () => ac.abort();
    });
  };

  const handleChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

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
        <label htmlFor="deckId">
          Enter deck id:
          <input
            type="text"
            id="deckId"
            name="deckId"
            onChange={handleChange}
            value={formData.deckId}
          />
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
