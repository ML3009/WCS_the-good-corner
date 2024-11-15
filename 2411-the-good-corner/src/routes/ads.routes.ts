import { Router } from "express";
import AdService from "../services/ad.service";
import { Ad, PartialAdWithoutId, AdCreate } from "../types/ads";

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
    const { id, title, description, price, picture, location, categoryId } : AdCreate<Ad> = req.body; 
    try {
        const newAd = await new AdService().createAd({ id, title, description, price, picture, location, categoryId });
        res.status(201).send({message: `Création réussie de l'annonce ${newAd.id}`});
    } catch (err) {
        res.status(409).send({message: "Une annonce avec cet ID existe déjà"});
    }

});

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    try {
        const adDeleted = await new AdService().deleteAd(id);
        res.status(202).send({message: `L'annonce ${adDeleted} a été supprimée`});
    } catch (err) {
        res.status(404).send({message: "L'annonce n'existe pas"});
    }
});

router.patch("/update/:id", async (req, res) => {
    const { id } = req.params
    const { title, description, price, picture, location }: PartialAdWithoutId = req.body;
    try {
        await new AdService().updateAd(id, {title, description, price, picture, location}) 
        res.status(200).send("Annonce mise à jour");
    } catch (err: any) {
        res.status(500).send({ success: false, errorMessage: err.message ?? err }); // opérateur de coalescence ?? ||
    }
})

export default router;