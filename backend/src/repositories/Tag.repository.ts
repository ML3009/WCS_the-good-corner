import { Repository } from "typeorm";
import TagEntity from "../entities/Tag.entity"
import datasource from "../lib/datasource";


export default class TagRepository extends Repository<TagEntity> {
    constructor(){
        super(TagEntity, datasource.createEntityManager());
    
    }
}