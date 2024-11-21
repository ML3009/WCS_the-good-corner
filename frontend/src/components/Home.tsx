import ListAds from "./ListAds"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div>
            Home
            <ListAds />
            <Link to={'/ads/create'}>Ajouter un nouveau produit</Link>
        </div>
    )
}