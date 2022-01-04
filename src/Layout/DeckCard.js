import { useParams, Link } from "react-router-dom";

export default function DeckCard( {key, title, length, description, id} ) {    

    return(
        <div>
            <h2>{title}</h2>    <p>{length}cards</p>
            <h3>{description}</h3>
            <p><Link to={`/decks/${id}`}>ViewDeck</Link><Link to={`/decks/${id}/study`}>Study</Link><button>delete deck</button></p>
        </div>
    )

}