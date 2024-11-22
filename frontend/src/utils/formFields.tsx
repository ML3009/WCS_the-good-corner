import { HTMLInputTypeAttribute } from "react";
import { AdKey } from "../types/ads"


const formFields: {
  name: AdKey;
  label: string;
  type: Extract<HTMLInputTypeAttribute, "text" | "number" | "file">; //Pick
}[] = [
  { name: "title", label: "Titre", type: "text" },
  { name: "description", label: "Description", type: "text" },
  { name: "price", label: "Prix", type: "number" },
  { name: "picture", label: "Image", type: "file" },
  { name: "location", label: "Localisation", type: "text" },
];

export default formFields;