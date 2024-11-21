import formFields from "../utils/formFields";
import instance from "../lib/instance";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdCreateFormInfos, AdType } from "../types/ads";

type CategoryType = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

function NewAd() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryType[]>();
  const [data, setData] = useState<AdCreateFormInfos>({
//   const [data, setData] = useState<AdCreateFormInfos>({
    title: "",
    description: "",
    price: 0,
    picture: "",
    location: "",
    category: { id: "" },
  });
  const [error, setError] = useState();

  const getCategories = async () => {
    try {
      const { data } = await instance.get<CategoryType[]>("categories/list");
      setCategories(data);
    } catch (err: any) {
      console.log({ err });
      setError(err.reponse.data.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("DATA", data);
    try {
      await instance.post("/ads/create", data);
      navigate("/");
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: name === "category" ? { id: value } : value, // {category : {id}}
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <label>
                Titre : </label>
                <input type="text" name="title" value={} />
            </label> */}
        <select name="category" required onChange={handleChange}>
          <option>Choisir une catégorie</option>
          {categories?.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            );
          })}
        </select>

        {formFields.map((field) => (
          <label key={field.label} style={{ display: "flex" }}>
            {field.name}:
            <input
              type={field.type}
              name={field.name}
              onChange={handleChange}
              value={data[field.name]}
            />
          </label>
        ))}
        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
}
export default NewAd;






















// import { HTMLInputTypeAttribute, useEffect, useState } from "react";
// import instance from "@/lib/instance";
// import { Category } from "@/types/categories";
// import { ProductType } from "@/types/ads";
// import { useNavigate } from "react-router-dom";
// type AdCreateFormInfos = Partial<
//   Omit<ProductType, "id" | "created_at" | "updated_at">
// > & { category?: { id: string } };

// const fields: {
//   placeholder: string;
//   name: keyof Omit<AdCreateFormInfos, "category">;
//   type: Extract<HTMLInputTypeAttribute, "text" | "number">;
// //   type: AdCreateFormInfos[keyof Omit<AdCreateFormInfos, "category">]; //? a expliquer
// //   type: "text" | "number"; //? a expliquer
// }[] = [
//   { placeholder: "Titre", name: "title", type: "text" },
//   { placeholder: "Description", name: "description", type: "text" },
//   { placeholder: "Prix", name: "price", type: "number" },
//   { placeholder: "Url de l'image", name: "picture", type: "text" },
//   { placeholder: "Localité", name: "location", type: "text" },
// ];

// function AdCreate() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [formInfos, setFormInfos] = useState<AdCreateFormInfos>();
//   const navigate = useNavigate();
//   const getCategories = async () => {
//     try {
//       const { data } = await instance.get<Category[]>("/categories/list");
//       setCategories(data);
//     } catch (err: any) {
//       console.log(err);
//     }
//   };
 

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // const formData = new FormData(e.currentTarget); //! A montrer
//     // const data = Object.fromEntries(formData);
//     // console.log(data);
//     try {
//       const { data } = await instance.post<{
//         ad: AdCreateFormInfos;
//         success: boolean;
//       }>("/ads/create", formInfos);
//       if (data.success) {
//         navigate("/");
//       }
//     } catch (err: any) {
//       console.log(err);
//     }
//   };
  
//   const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const id = e.target.value;
//     setFormInfos({ ...formInfos, category: { id } });
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const field = e.currentTarget.name as keyof Omit<
//       AdCreateFormInfos,
//       "category"
//     >;
//     setFormInfos({ ...formInfos, [field]: e.target.value });
//   };

//   const getFields = () => {
//     return fields.map((f) => (
//       <input
//         type={f.type}
//         placeholder={f.placeholder}
//         name={f.name}
//         onChange={handleChange}
//       />
//     ));
//   };
//   useEffect(() => {
//     getCategories();
//   }, []);

//   return (
//     <div>
//       {categories.length > 0 && (
//         <form onSubmit={handleSubmit}>
//           <select
//             onChange={handleChangeCategory}
//             value={formInfos?.category?.id}
//           >
//             <option>Choisissez une catégorie</option>
//             {categories.map((c) => (
//               <option value={c.id}>{c.title}</option>
//             ))}
//           </select>
//           {getFields()}
         
//           <button>Ajouter l'annonce</button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default AdCreate;