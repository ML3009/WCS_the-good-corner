import instance from "../lib/instance";
import formFields from "../utils/formFields";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CategoryType } from "@/types/category";
import { AdCreateFormInfos } from "../types/ads";


function AdUpdate() {
    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const [categories, setCategories] = useState<CategoryType[]>();
    const [data, setData] = useState<AdCreateFormInfos>({
        title: "",
        description:"",
        price:0,
        picture:"",
        location:"",
        category: { id:"" },
    });
    const [error, setError] = useState();


    const getCategories = async () => {
        try {
            const { data } = await instance.get<CategoryType[]>("/categories/list");
            setCategories(data);
        } catch (err: any) {
            console.log({ err });
            setError(err.response.data.message);
        }
    };

    const getAdDetails = async () => {
        try {
            const { data } = await instance.get<AdCreateFormInfos>(`/ads/find/${id}`);
            setData({
                ...data,
                category: data.category || { id: "" },
            });
        } catch (err: any) {
            console.log({ err });
            setError(err.response.data.message);
        }
    };

    useEffect(() => {
        getCategories();
        getAdDetails();
    }, [id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: name === "category" ? { id: value } : value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await instance.patch(`/ads/update/${id}`, data);
            navigate("/");
        } catch (err: any) {
            console.log(err);
            setError(err.response.data.message);
        }
    };
    

    return (
        <div>
            <h1>Update Ad</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <select name="category" required onChange={handleChange} value={data.category.id}>
                    <option value="">Choisir une catégorie</option>
                    {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>

                {formFields.map((field) => (
                    <label key={field.label} style={{ display: "flex" }}>
                        {field.label}:
                        <input
                            type={field.type}
                            name={field.name}
                            onChange={handleChange}
                            value={data[field.name as keyof AdCreateFormInfos] as string | number}
                        />
                    </label>
                ))}
                            <button type="submit">Update</button>
                        </form>
        </div>
    )
}

export default AdUpdate;