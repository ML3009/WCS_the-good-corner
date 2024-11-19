import { Repository } from "typeorm";
import AdEntity from "../entities/Ad.entity";
import datasource from "../lib/datasource";

export default class AdRepository extends Repository<AdEntity> {
    constructor() {
        super(AdEntity, datasource.createEntityManager());
    }

    /**
     * On pourra rajouter de nouvelles fonctions à notre catalogue de requête
     */
}