import AdRepository from "../repositories/Ad.repository";
import AdEntity from "../entities/Ad.entity";
import TagEntity from "../entities/Tag.entity"
import TagService from "../services/tag.service"

export default class AdService {

    db: AdRepository
    constructor(){
        this.db = new AdRepository();
    }
    
    async listAds() {
        return await this.db.find({ relations: ["category"] });
    }
    
    async findAdById(id: string)  {
        const ad = await this.db.findOne({where: {id}})
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
        const newAd = await this.db.save({
            ...ad,
            tags,
        });
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