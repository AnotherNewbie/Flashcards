import { useLocation, useParams, Link } from "react-router-dom";


export default function Study() {
    const {deckId} = useParams;    
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
    </>
  );
}
