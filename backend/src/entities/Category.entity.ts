import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import AdEntity from "./Ad.entity";


@Entity({name : "categories"})
export default class CategoryEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true}) 
    title: string;

    @OneToMany(() => AdEntity, (ads) => ads.category)
    ads: AdEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

// Si une colonne est optionnelle il faut le preciser pour 
// TS et pour typeORM. donc {nullable:true} pour typeORM
// et ?: pour TS