import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tags"})
export default class TagEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        unique: true,
        transformer: {
            to: (value: string) => value.toLowerCase(), // exemple d'un transformateur pour agir à l'étape d'insertion
            from: (value: string) => value, // possiblité d'agir sir besoin sur le formatage de la donnée lors d'une récupération de ce champs
        },
    })
    label: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
