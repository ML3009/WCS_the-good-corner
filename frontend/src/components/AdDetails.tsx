import { useEffect, useState } from "react";
import instance from "../lib/instance.ts";
import type { AdType } from "../types/ads.d.ts";
import { useParams } from "react-router-dom"


function AdDetails() {
    const { id } = useParams<{id: string}>()
    console.log(id);
    const [ad, setAd] = useState<AdType>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState("");
    
    const getAd = async () => {
        try {
            const { data } = await instance.get<AdType>(`/ads/find/${id}`)
            console.log(data);
            setAd(data);
        } catch(error: any) {
            setError(error.response.data.message)
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getAd();
    }, [])

    if (isLoading) {
        return <div>Chargement en cours</div>
    }

    return (
    <>
       {ad ?
            (
                <>
                    <h1>{ad?.title}</h1>
                    <p>{ad?.description}</p>
                    <p>{ad?.price}</p>
                    <p>{ad?.created_at}</p>
                    {ad?.tags?.map((tag) => (
                        <p key={tag.id}>{tag.label}</p>
                    ))}
                </>
            ) : (
                <div>{error}</div>
            )
       }
     </>
    )
}

export default AdDetails;