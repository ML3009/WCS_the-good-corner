import CategoryRepository from "../repositories/Category.repository";
import CategoryEntity from "../entities/Category.entity";

export default class CategoryService {

    db: CategoryRepository;
    constructor(){
        this.db = new CategoryRepository;
    }

    async listCategory()  {
        return await this.db.find({relations: ["ads"]});
    }

    async findCategoryById(id: string, limit?: string) {
        let category: CategoryEntity | null;
        if (limit) { // si limit est indiquée, on va chercher la méthode personnalisé dans notre repository
          category = await this.db.findCategoryByIdWithLimitAds(id, limit);
        } else {
          category = await this.db.findOne({ where: { id } });
        }
        // const category = await this.db.findOne({ where: { id } });
        if (!category) {
          throw new Error("No Category found");
        }
        return category;
      }

    async create(category: Omit<CategoryEntity, "id" | "created_at" | "updated_at" | "ads">) {
        const newCategory = await this.db.save({
            ...category,
        });
        return newCategory;
    }

    async delete(id: string)  {    
        const deletedCategory = await this.db.delete({ id });
        if (deletedCategory.affected === 0) {
            throw new Error("Category not found");
        }
        return id;
    }
    
    async update( id: string, category: Partial<Omit<CategoryEntity, "id">> )  {
        const existingCategory = await this.db.findOneBy({id});
        if (!existingCategory) {
            throw new Error("Category not found");
        }
        const updateCategory = this.db.merge(existingCategory, category);
        return await this.db.save(updateCategory);
    }
}