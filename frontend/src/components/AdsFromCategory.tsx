import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../lib/instance";
import { CategoryType } from "../types/category";
import CardAd from "./CardAd";
import { AdType } from "../types/ads";

function AdsFromCategory() {
  const params = useParams();
  const [ads, setAds] = useState<CategoryType["ads"]>([]);
  const [loading, setLoading] = useState(false);
  const getAdsFromCategory = async () => {
    try {
      const { data } = await instance.get<CategoryType>(
        `/categories/find/${params.id}`
      );
      console.log("DATA",data)
      setAds(data.ads);
    } catch (err: any) {
      console.log("il y a eu une erreur");
    }
    setLoading(false);
  };
  useEffect(() => {
    getAdsFromCategory();
  }, [params.id]);

  if (loading) {
    return <div>Chargement en cours</div>;
  }
  return (
    <div>
      {ads?.map((a) => (
        <CardAd key={a.id} data={a} />
      ))}
    </div>
  );
}

export default AdsFromCategory;