import AdRepository from "../repositories/Ad.repository";
import AdEntity from "../entities/Ad.entity";
import TagEntity from "../entities/Tag.entity"
import TagService from "../services/tag.service"
import { validate } from "class-validator";
import { FindOneOptions, FindOptionsOrderValue } from "typeorm";

export default class AdService {

    db: AdRepository
    constructor(){
        this.db = new AdRepository();
    }
    
    async listAds(options: {
        limit?: number;
        order?: FindOptionsOrderValue;
    }) {
        return await this.db.find({ 
            relations: ["category", "tags"],
            order: {created_at: options.order ?? "ASC"},
            take: options.limit,
         });
    }
    
    async findAdById(id: string)  {
        const ad = await this.db.findOne({where: {id}, relations: ["category", "tags"]})
        if (!ad) {
            throw new Error("Ad not found")
        }
        return ad;
    }

    async create({
        tagsIds,
        ...ad 
    }: Omit<AdEntity, "id" | "created_at" | "updated_at" | "tags"> & {
        tagsIds: string[]
    }) {
        let tags: TagEntity[] = [];
        if (tagsIds.length > 0) {
            tags = await new TagService().findMultipleTagsByIds(tagsIds);
            console.log(tags)
        }
        const newAd = this.db.create({
            ...ad,
            tags,
        });

        const errors = await validate(newAd)
        if (errors.length > 0) {
            throw new Error(errors[0].value)
        }

       await this.db.save(newAd);
        return newAd;
    }

    async delete( id : string )  {
        const deletedAd = await this.db.delete({ id });
        if (deletedAd.affected === 0) {
            throw new Error("Ad not found");
        }
        return id;
    }

    async update( id: string, ad: Partial<Omit<AdEntity, "id">> ) {       
        const existingAd = await this.db.findOneBy({id: id});
        if (!existingAd) {
            throw new Error("Ad not found");
        }
        const updatedAd = this.db.merge(existingAd, ad);
        return await this.db.save(updatedAd);
    }
}