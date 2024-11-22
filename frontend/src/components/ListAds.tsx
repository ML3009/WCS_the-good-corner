import CardAd from "./CardAd"
import { useEffect, useState } from "react";
import instance from "../lib/instance.ts";
import type { AdType } from "../types/ads.d.ts";

export default function ListAds(){
    
    const [dataAds, setDataAds] = useState<AdType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getAds = async () => {
        try {
            const { data } = await instance.get<AdType[]>("/ads/list?limit=5&order=DESC");
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
        <div className= "flex flex-wrap bg-violet-800">
            { dataAds.length > 0 ? 
                (
                    dataAds.map((ad) => {
                            return (
                            <CardAd 
                                key={ad.id}
                                data ={ad}
                            />
                        )})
                ) : (
                    <div>Aucune annonce</div>
                )
            }
        </div>
    )
}