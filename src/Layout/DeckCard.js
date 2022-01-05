import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import ErrorMessage from "./ErrorMessage";

export default function DeckCard({ title, length, description, id }) {
  const [error, setError] = useState(undefined);
  function deleteHandler(id) {    
      const ac = new AbortController();
      deleteDeck(id, ac.signal)
        .then(() => {
          return () => ac.abort();
        })
        .catch((error) => setError(error));

    if (error) {
      return <ErrorMessage error={error} />;
    }
  }

  return (
    <div>
      <h2>{title}</h2> <p>{length} cards</p>
      <h3>{description}</h3>
      <p>
        <Link to={`/decks/${id}`}>View Deck </Link>
        <Link to={`/decks/${id}/study`}>Study </Link>
        <button name="delete" onClick={() => deleteHandler(id)}>
          delete deck
        </button>
      </p>
    </div>
  );
}
