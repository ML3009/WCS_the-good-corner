import { DataSource } from "typeorm";
import CategoryEntity from "../entities/Category.entity";
import AdEntity from "../entities/Ad.entity";
import TagEntity from "../entities/Tag.entity";

export default new DataSource ({
    type: "sqlite",
    database: "the-good-corner-orm.sqlite",
    entities: [AdEntity, CategoryEntity, TagEntity], // autre possibilite : "/src/entities/*.entities.ts" => ne fonctionne pas bien avec les tests Jest
    synchronize: true, // pas à utilier en prod (faire des migrations pour la prod)
    logging: ["error", "query"] // nous permettra de voir les requêtes SQL qui sont jouées dans le terminal
})