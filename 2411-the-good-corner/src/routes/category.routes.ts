import { Router } from "express";
import  CategoryService  from "../services/category.service";
import { Category, PartialCategoryWithoutId } from "../types/category";

const router = Router();

router.get("/list", async (req, res) => {
    const categoryList = await new CategoryService().listCategory();
    res.status(200).json(categoryList)
});

router.get("/find/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const category = await new CategoryService().findCategoryById(id);
        res.status(200).json(category);
    } catch (err) {
        res.status(404).send({message: "L'annonce n'existe pas"});
    }
});

router.post("/create", async (req, res) => {
    const { id, title } : Category = req.body;
    try {
        const newCategory = await new CategoryService().createCategory({id, title});
        res.status(201).send({message: `Création réussie de la catégorie ${newCategory.title}`});
    } catch (err) {
        res.status(409).send({message:  "Une catégorie avec cet ID existe déjà"});
    }
});

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const categoryDelete = await new CategoryService().deleteCategory(id);
        res.status(202).send({message: `L'annonce ${categoryDelete} a été supprimée`});
    } catch (err) {
        res.status(404).send({message: "L'annonce n'existe pas"});
    }
});

router.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title } : PartialCategoryWithoutId = req.body;
    try {
        await new CategoryService().updateCategory(id, {title});
        res.status(200).send("Annonce mise à jour");
    } catch (err: any) {
        res.status(500).send({success: false, errorMessage: err.message ?? err});
    }
})


export default router;