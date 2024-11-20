import CardAd from "./CardAd"
import { useEffect, useState } from "react";
import instance from "../lib/instance.ts";
import type { AdType } from "../types/ads.d.ts";

export default function ListAds(){
    
    const [dataAds, setDataAds] = useState<AdType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getAds = async () => {
        try {
            const { data } = await instance.get<AdType[]>("/ads/list");
            setDataAds(data);
            setIsLoading(false);
        } catch(error: unknown) {
            console.log(error);
        }
    };
    
    useEffect(() => {
            getAds();
    }, [])

    if (isLoading){
        return <div>Chargement en cours</div>
    }
    return (
        <>
            { dataAds.length > 0 ? 
                (
                    dataAds.map((ad) => {
                            return (
                            <CardAd 
                                key={ad.id}
                                id ={ad.id}
                                title={ad.title}
                                description={ad.description}
                                price={ad.price}
                                created_at={ad.created_at}
                            />
                        )})
                ) : (
                    <div>Aucune annonce</div>
                )
            }
        </>
    )
}