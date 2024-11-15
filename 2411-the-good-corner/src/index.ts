import "reflect-metadata";
import express from "express";
import adsRouter from "./routes/ads.routes";
import categoryRouter from "./routes/category.routes";

const app = express();
const port = 4000;

app.use(express.json());

app.use("/ads", adsRouter);

app.use("/category", categoryRouter);



app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)
});

