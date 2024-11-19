import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import  CategoryEntity from "./Category.entity";
import TagEntity from "./Tag.entity";

@Entity({ name: "ads" })
export default class AdEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({type: "float"}) // ici on spécifie float parce que number de TS peut être compris comme integer par typeORM
    price: number;

    @Column()
    picture: string;

    @Column()
    location: string;
    
    @ManyToOne(() => CategoryEntity, (category) => category.ads, {
        onDelete: "CASCADE",
    })
    category: CategoryEntity;

    @ManyToMany(() => TagEntity)
    @JoinTable({
        name: "ads_tags",
        joinColumn: { name: "ad_id" },
        inverseJoinColumn: { name: "tag_id" },
    })
    tags: TagEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}