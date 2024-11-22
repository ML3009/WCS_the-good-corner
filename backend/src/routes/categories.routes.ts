import { Router } from "express";
import  CategoryService  from "../services/category.service";
import CategoryEntity from "../entities/Category.entity";

const router = Router();

router.get("/list", async (req, res) => {
    const categoryList = await new CategoryService().listCategory();
    res.status(200).json(categoryList)
});

// router.get("/find/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//         const category = await new CategoryService().findCategoryById(id);
//         res.status(200).json(category);
//     } catch (err) {
//         res.status(404).send({message: "L'annonce n'existe pas"});
//     }
// });

router.get("/find/:id/:limit?", async (req, res) => {
    const { id , limit} = req.params;
    try {
      const category = await new CategoryService().findCategoryById(id, limit);
      res.send(category);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  });

router.post("/create", async (req, res) => {
    const { title } : Omit<CategoryEntity, "id" | "created_at" | "updated_at" | "ads"> = req.body;
    try {
        const newCategory = await new CategoryService().create({ title });
        res.status(201).send({message: `Création réussie de la catégorie ${newCategory.title}`});
    } catch (err) {
        res.status(409).send({message:  "Une catégorie avec cet ID existe déjà"});
    }
});

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const categoryDelete = await new CategoryService().delete(id);
        res.status(202).send({message: `La catégorie ${categoryDelete} a été supprimée`});
    } catch (err) {
        res.status(404).send({message: "La catégorie n'existe pas"});
    }
});

router.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title } : Partial<Omit<CategoryEntity, "id">> = req.body;
    try {
        const updateCategory = await new CategoryService().update(id, {title});
        res.status(200).send(updateCategory);
    } catch (err: any) {
        res.status(500).send({success: false, errorMessage: err.message ?? err});
    }
})


export default router;