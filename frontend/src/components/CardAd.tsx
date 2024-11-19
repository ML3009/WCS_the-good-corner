import { AdType } from "./ListAds"
import { Link } from "react-router-dom"


export default function CardAd(props: Partial<AdType>) {
    return (
        <>
            <div className="card">
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <p>{props.price}</p>
                <p>{props.created_at}</p>
                <Link to={`/ads/${props.id}`}>Voir le produit</Link>
            </div>
        </>
    )
}