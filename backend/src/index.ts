import "reflect-metadata";
import express from "express";
import adsRouter from "./routes/ads.routes";
import categoriesRouter from "./routes/categories.routes";
import tagsRouter from "./routes/tags.routes";
import datasource from "./lib/datasource";
import cors from "cors";

const app = express();

const port = 4000;

app.use(cors({origin: ["http://localhost:5173"]})) // on autorise le front à communiquer avec notre back

app.use(express.json());

app.use("/ads", adsRouter);

app.use("/categories", categoriesRouter);

app.use("/tags", tagsRouter);


app.listen(port, async () => {
    await datasource.initialize(); // initialisation de la base de données 
    console.log(`Le serveur est lancé sur le port ${port}`)
});
