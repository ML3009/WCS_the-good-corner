import CardAd from "./CardAd"
import { useEffect, useState } from "react";
import instance from "../lib/instance.ts";


export type AdType = {
    id: string;
    title: string;
    description: string;
    price: number;
    picture:string;
    location:string;
    created_at: string;
    updated_at: string
}

export default function ListAds(){
    
    const [dataAds, setDataAds] = useState<AdType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getAds = async () => {
        //prevoir le try catch
        const { data } = await instance.get<AdType[]>("/ads/list");
        setDataAds(data);
        setIsLoading(false);
    };
    
    useEffect(() => {
        setTimeout(() => {
            getAds();
        }, 4000);
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