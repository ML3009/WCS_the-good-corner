import { Router } from "express";
import TagService from "../services/tag.service";
import TagEntity from "../entities/Tag.entity";

const router = Router();

router.get("/list", async (req, res) => {
    try {
        const tagsList = await new TagService().listTags();
        res.status(200).send(tagsList);
    } catch(err: any) {
        res.status(500).send({message: err.message});
    }
});

router.get("/find/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const tag = await new TagService().findTagById(id);
        res.status(200).json(tag);
    } catch (err: any) {
        res.status(404).send({ message: err.message });
    }
});

router.post("/create", async (req, res) => {
    const { label } : Omit<TagEntity, "id" | "created_at" | "updated_at"> = req.body;
    try {
        const newTag = await new TagService().create({ label });
        res.status(201).send({success: true, tag: newTag});
    } catch (err: any) {
        res.status(500).send({ success: false, errorMessage: err.message });
    }
});

router.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { label } : Partial<Omit<TagEntity, "id">> = req.body;
    try {
        const updateTag = await new TagService().update(id, {label});
        res.status(200).send(updateTag);
    } catch (err: any) {
        res.status(500).send({success: false, errorMessage: err.message ?? err});
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const tagDelete = await new TagService().delete(id);
        res.status(202).send({message: `Le tag ${tagDelete} a été supprimé`});
    } catch (err: any) {
        res.status(404).send({ error: "Le tag n'a pas pu etre supprimé : " + err });
    }
});

export default router;