import type { AdType } from "@/types/ads.d.ts";
import { Link } from "react-router-dom"


export default function CardAd(props: Partial<AdType>) {
    return (
        <>
            <div className="card">
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <p>{props.price} Euros</p>
                <p>{props.created_at}</p>
                <p><Link to={`/ads/view/${props.id}`}>Voir le produit</Link> </p>
                <p><Link to={`/ads/view/update/${props.id}`}>Modifier le produit</Link></p>
            </div>
        </>
    )
}