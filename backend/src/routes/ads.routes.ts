import { Router } from "express";
import AdService from "../services/ad.service";
import AdEntity from "../entities/Ad.entity";
import multer from "multer";
import { FindOneOptions, FindOptionsOrderValue } from "typeorm";


const router = Router();

const storage = multer.diskStorage({
    destination(req, file, callback) { // dossier de stockage des fichiers
        callback(null, "uploads/" )
    },
    filename(req, file, callback) { // renommage des fichiers pour éviter les conflits 
        callback(null, Date.now() + "-" + file.originalname)
    },
})

const upload = multer({storage});

router.get("/list", async (req, res) => {
    const { limit, order } = req.query;
    try {
        const adsList = await new AdService().listAds({ limit, order } as {
            limit?: number;
            order?: FindOptionsOrderValue;
        });
        res.status(200).send(adsList)
    } catch (err: any){
        res.status(500).send({message: err.message});
    }
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
router.post("/create", upload.single("picture"), async (req, res) => {
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
    console.log("REQ FILE", req.file);
    const ad = {
            title,
            description,
            picture: req.file?.filename ?? "",
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
        category, 
        tagsIds,
    }: Partial<Omit<AdEntity, "id" | "tags"> & {
        tagsIds: string[];
    }> = req.body;
    const ad = { title, description, picture, location, price, category, tagsIds };
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