import type { AdType } from "@/types/ads.d.ts";
import { Link } from "react-router-dom"
import FoxPicture from "../assets/fox.png"


export default function CardAd(props: { data: AdType}) {
    return (
        <>
            <div className="card">
                <h1>{props.data.title}</h1>
                <p>{props.data.description}</p>
                <p>{props.data.price} Euros</p>
                <p>{props.data.created_at}</p>
                <img 
                    alt="picture-ad" 
                    src={ props.data.picture ? `${import.meta.env.VITE_BACKEND_URL_FILES}${props.data.picture}` : FoxPicture}
                    style={{ maxWidth: 300, maxHeight: 300 }}></img>
                <p><Link 
                     className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    to={`/ads/view/${props.data.id}`}>Voir le produit</Link> </p>
                <p><Link to={`/ads/view/update/${props.data.id}`}>Modifier le produit</Link></p>
            </div>
        </>
    )
}