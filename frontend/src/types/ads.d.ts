import { CategoryType } from "./category";

type AdKey =
  //   | "id"
  "title" | "description" | "price" | "picture" | "location";
//   | "created_at"
//   | "updatedAt";


export type AdType = {
  id: string,
  title: string,
  description: string,
  price: number,
  picture: string,
  location: string,
  created_at: string,
  updated_at: string,
  category: CategoryType,
  // tags?: [
  //   {
  //     id?: string,
  //     label?: string,
  //     created_at?: string,
  //     updated_at?: string
  //   }
  // ]
}


export type AdTypeWithKeys = AdType & {
  [key: string]: string | number;
};


export type AdCreateFormInfosWithoutParams = Omit<
  AdType,
  "id" | "created_at" | "updated_at"
>;

export type AdCreateFormInfos = Omit<
  ProductType,
  "id" | "created_at" | "updated_at" | "category"
> & { category: { id: string } };


// export type AdCreateFormInfos = Partial<
//   Omit<AdType, "id" | "created_at" | "updated_at">
// > &
//   Partial<{ category: { id: string } }>;



  