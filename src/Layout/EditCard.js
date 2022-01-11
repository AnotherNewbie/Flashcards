import React, {useState, useEffect} from "react";
import CardForm from "./CardForm";
import { readCard } from "../utils/api";
import ErrorMessage from "./ErrorMessage";
import { useParams } from "react-router-dom";

export default function EditCard(props) {
    // const {cardId} = props;
    const [card, setCard] = useState({id:"",front:"", back:"", deckId:""});
    const ac = new AbortController();
    const [error, setError] = useState(undefined);
    const {cardId, deckId} = useParams();    

    console.log(cardId);

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
      },[cardId]);

      if (error) {
        return <ErrorMessage error={error} />;
      }      
      
    return(
        <>
            <CardForm cardId={cardId} frontIN={card.front} backIN={card.back} deckId={deckId}/>
        </>
    )
}