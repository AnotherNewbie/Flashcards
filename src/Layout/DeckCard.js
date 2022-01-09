import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import ErrorMessage from "./ErrorMessage";

export default function DeckCard({ title, length, description, id }) {
  const [error, setError] = useState(undefined);
  function deleteHandler(id) {
    const ac = new AbortController();
    if (
      window.confirm(
        "Do you really want to delete this deck?\nYou will not be able to recover it."
      )
    ) {
      deleteDeck(id, ac.signal)
        .then(() => {
          return () => ac.abort();
        })
        .catch((error) => setError(error));

      if (error) {
        return <ErrorMessage error={error} />;
      }
    }
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>{title}</h2>
          </div>
          <div className="col">{length} cards</div>
        </div>
        <div className="row">
          <div className="col">{description}</div>
        </div>
        <div className="row">
          <div className="col">
            <Link to={`/decks/${id}`}>
              <button type="button" className="btn btn-secondary">
                View Deck
              </button>
            </Link>
            <Link to={`/decks/${id}/study`}>
              <button type="button" className="btn btn-primary">
                Study
              </button>
            </Link>
          </div>
          <div className="col">
            <button
              name="delete"
              type="button"
              className="btn btn-danger"
              onClick={() => deleteHandler(id)}
            >
              delete deck
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
