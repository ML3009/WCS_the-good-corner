import { useEffect, useState } from "react";
import instance from "../lib/instance.ts";
import { AdType } from "./ListAds.tsx"
import { useParams } from "react-router-dom"


function AdDetails() {
    const { id } = useParams<{id: string}>()
    console.log(id);
    const [dataAd, setDataAd] = useState<AdType>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getAd = async () => {
        try {
            const { data } = await instance.get<AdType>(`/ads/find/${id}`)
            setDataAd(data);
            setIsLoading(false);

        } catch(error: unknown) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAd();
    }, [])

    if (isLoading) {
        return <div>Chargement en cours</div>
    }

    return (
    <>
       {dataAd === undefined ?
            (
                <div>Annonce désactivée</div>
            ) : (
            <>
                <h1>{dataAd?.title}</h1>
                <p>{dataAd?.description}</p>
                <p>{dataAd?.price}</p>
                <p>{dataAd?.created_at}</p>
            </>
            )
       }
     </>
    )
}

export default AdDetails;