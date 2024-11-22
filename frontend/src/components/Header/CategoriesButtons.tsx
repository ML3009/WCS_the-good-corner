import { useEffect, useState } from "react";
import instance from "../../lib/instance";
import { CategoryType } from "../../types/category";
import { Link } from "react-router-dom";

function CategoriesButtons() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const getCategories = async () => {
    try {
      const { data } = await instance.get<CategoryType[]>("/categories/list");
      console.log("%c⧭", "color: #006dcc", data);
      setCategories(data);
    } catch (err: any) {
      console.log({ err });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="flex gap-5 justify-center mb-5" >
      {categories.map((c) => (
        <Link key={c.id} to={`/categories/${c.id}`}>{c.title}</Link>
      ))}
    </div>
  );
}

export default CategoriesButtons;