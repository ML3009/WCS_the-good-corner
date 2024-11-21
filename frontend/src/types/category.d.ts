import { AdType } from "./ads"

export type CategoryType = {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
    ads: Omit< AdType, "tags" | "categories">


    
}