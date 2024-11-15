import { Category, PartialCategoryWithoutId } from "../types/category";
import sqlite3 from "sqlite3";

export default class CategoryService {

    db: sqlite3.Database;
    constructor(){
        this.db = new sqlite3.Database("the-good-corner.sqlite");
    }

    listCategory() : Promise<Category[]> {
        return new Promise<Category[]>((resolve, reject) => {
            this.db.all<Category>("SELECT * FROM category", (err: any, rows) => {
                if(err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    findCategoryById(id: string) : Promise<Category> {
        const numericId = Number(id);
        return new Promise<Category>((resolve, reject) => {
            this.db.get<Category>("SELECT * FROM category WHERE id = ?", [numericId], (err: any, row) => {
                if (err) {
                    reject(err);
                }
                if (!row) {
                    reject("L'annonce n'existe pas");
                }
                resolve(row);
            });
        });
    }

    createCategory(category: Category) : Promise<Category> {
        return new Promise<Category>((resolve, reject) => {
            this.db.run(
                "INSERT INTO category (title) VALUES (?)",
                [category.title],
                function (err: any) {
                    if (err) {
                        reject (err);
                    }
                    resolve ({...category, id: `${this.lastID}`});
                });
        });
    }


    deleteCategory(id: string) : Promise<string> {       
        return new Promise<string>((resolve, reject) => {
            const query = `
                DELETE FROM category WHERE id = ?
            `;
            this.db.run(query, [id], function (err: any) {
                if (err) {
                    reject(err);
                } else {
                    if (this.changes === 0) {
                        reject("L'annonce n'existe pas");
                    }
                    resolve(id);
                }
            });
        }); 
    }
    
    async updateCategory( id: string, category: Partial<PartialCategoryWithoutId> ) : Promise<Category> {
        return new Promise<Category>( async (resolve, reject) => {
            try {
                const categoryFound = await this.findCategoryById(id);
                Object.keys(category).forEach((k) => {
                    if (category[k]){
                        categoryFound[k] = category[k]
                    }
                })
                const query = `
                    UPDATE category 
                    SET 
                        title = ?
                    WHERE id = ?
                `;
                const params = [
                    categoryFound.title,
                    id
                ];
                this.db.run(query, params, function(err) {
                    if (err) {
                        reject(err);
                    }
                    if (this.changes === 0) {
                        reject("L'annonce n'existe pas");
                    }
                    resolve(categoryFound);
                })
            } catch (error) {
                reject(error);
            }
        })
    }
}