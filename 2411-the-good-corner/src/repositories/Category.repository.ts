import { Repository } from "typeorm";
import CategoryEntity from "../entities/Category.entity";
import datasource from "../lib/datasource";
import AdRepository from "./Ad.repository";

export default class CategoryRepository extends Repository<CategoryEntity> {
    constructor() {
        super(CategoryEntity, datasource.createEntityManager());
    }

    async findCategoryByIdWithLimitAds(id: string, limit: string) {
        const adsRepository = new AdRepository();
        const category = await this.findOne({
          where: { id },
        });
        if (!category) {
          throw new Error("No Category found");
        }
        const ads = await adsRepository.find({
          where: { category: { id } },
          order: { created_at: "DESC" },
          take: +limit,
        });
        /**======================
         *    Exemple de query builder
         *========================**/
        // const ads = await adsRepository.createQueryBuilder("ad")
        //   .where("ad.categoryId = :id", { id })
        //   .orderBy("ad.created_at", "DESC")
        //   .take(+limit)
        //   // .take(parseInt(limit))
        //   .getMany();
    
        return { ...category, ads };
      }
}