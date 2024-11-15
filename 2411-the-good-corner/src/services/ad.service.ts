import { Ad, PartialAdWithoutId, AdCreate } from "../types/ads";
import sqlite3 from "sqlite3";

export default class AdService {

    db: sqlite3.Database;
    constructor(){
        this.db = new sqlite3.Database("the-good-corner.sqlite");
    }

    listAds() : Promise<Ad[]> {
        return new Promise<Ad[]>((resolve, reject) => {
            const query = `
                SELECT 
                    ad.id,
                    ad.title,
                    ad.description,
                    ad.price,
                    ad.picture,
                    ad.location,
                    JSON_OBJECT(
                        'id', category.id,
                        'title', category.id
                    ) AS category
                    FROM ad
                    INNER JOIN category ON ad.categoryID = category.id
            `
            this.db.all<Ad & { category: string}>(query, (err: any, rows) => {
            if (err) {
                reject(err);
            }
            const formattedRows = rows.map((row) => ({
                ...row,
                category: JSON.parse(row.category),
            }))
            resolve(formattedRows);

            });
        });
    }
    
    findAdById(id: string) : Promise<Ad> {
        return new Promise<Ad & {category: string}>((resolve, reject) => {
            const query = `
                SELECT 
                    ad.id,
                    ad.title,
                    ad.description,
                    ad.price,
                    ad.location,
                    JSON_OBJECT(
                        'id', category.id,
                        'title', category.title
                    ) AS category
                FROM ad
                INNER JOIN category ON ad.categoryID = category.id WHERE ad.id = ?
                `
            this.db.get<Ad & {category: string}>(query, [id], (err: any, row) => {
                if (err) {
                    reject(err);
                }
                if (!row) {
                    reject("L'annonce n'exise pas");
                }
                const formattedRow = {
                    ...row,
                    category: JSON.parse(row.category),
                }
                resolve(formattedRow);
            });
        });
    }

    createAd(ad: AdCreate<Ad>) :Promise<Ad>  {
        return new Promise<Ad>((resolve, reject) => {
            this.db.run(
            "INSERT INTO ad (title, description, price, picture, location, categoryId) VALUES (?, ?, ?, ?, ?, ?)",
            [ad.title, ad.description, ad.price, ad.picture, ad.location, ad.categoryId],
            function (err: any) {
                if (err) {
                    reject(err);
                } 
                resolve({ ...ad, id: `${this.lastID}` });
            });
        });
    }

    deleteAd( delAdId : string ) : Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const query = `
                DELETE FROM ad WHERE id = ?
            `;
            this.db.run(query, [delAdId], function (err: any) {
                if (err) {
                    reject(err);
                } else {
                    if (this.changes === 0) {
                        reject("L'annonce n'existe pas");
                    }
                    resolve(delAdId)
                }
            })
        })
    }

    async updateAd( id: string, ad: Partial<PartialAdWithoutId> ) : Promise<Ad> {
        
        return new Promise<Ad>( async (resolve, reject) => {
            try {
                const adFound = await this.findAdById(id);
                Object.keys(ad).forEach((k) => {
                    if (ad[k]) {
                        adFound[k] = ad[k]
                    }
                });
                const query = `
                    UPDATE ad 
                    SET 
                        title = ?,
                        description = ?,
                        price = ?,
                        picture = ?,
                        location = ?
                    WHERE id = ?
                `;
                
                const params = [ 
                    adFound.title,
                    adFound.description,
                    adFound.price,
                    adFound.picture,
                    adFound.location,
                    id
                ];

                this.db.run(query, params, function (err)  {
                    if (err) {
                        reject(err);
                    }
                    if (this.changes === 0) {
                        reject("L'annonce n'existe pas");
                    }
                    resolve(adFound);
                    
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}