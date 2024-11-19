import { Router } from "express";
import AdService from "../services/ad.service";
import AdEntity from "../entities/Ad.entity";

const router = Router();

router.get("/list", async (req, res) => {

    const adsList = await new AdService().listAds();
    res.status(200).json(adsList)

});

router.get("/find/:id", async (req, res) => {
    const { id } = req.params
    try {
        const ad = await new AdService().findAdById(id);
        res.status(200).send(ad);
    } catch (err) {
        res.status(404).send({message: "L'annonce n'existe pas"});
    }
});

//express validator pour analyser la requete
router.post("/create", async (req, res) => {
    const { 
        title, 
        description, 
        price, 
        picture, 
        location, 
        category, 
        tagsIds, 
    } : Omit<AdEntity, "id" | "created_at" | "updated_at" | "tags"> & {
            tagsIds: string[];
        } = req.body; 
    const ad = {
            title,
            description,
            picture,
            location,
            price,
            category,
            tagsIds: tagsIds ?? [],
          };
        
    try {
        const newAd = await new AdService().create( ad );
        res.status(201).send({ success: true, ad: newAd });
    } catch (err: any) {
        res.status(500).send({ success: false, errorMessage: err.message });
    }

});


router.patch("/update/:id", async (req, res) => {
    const { id } = req.params
    const { 
        title, 
        description, 
        picture, 
        location,
        price, 
        tagsIds 
    }: Partial<Omit<AdEntity, "id" | "tags"> & {
        tagsIds: string[];
    }> = req.body;
    const ad = { title, description, picture, location, price, tagsIds };
    try {
        const updateAd = await new AdService().update(id, ad) 
        res.status(200).send(updateAd);
    } catch (err: any) {
        res.status(500).send({ success: false, errorMessage: err.message ?? err }); // opérateur de coalescence ?? ||
    }
});

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    try {
        const adDeleted = await new AdService().delete(id);
        res.status(202).send({message: `L'annonce ${adDeleted} a été supprimée`});
    } catch (err) {
        res.status(404).send({message: "L'annonce n'existe pas"});
    }
});

export default router;