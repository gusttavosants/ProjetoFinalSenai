import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
    export class Collaborator{
        @PrimaryGeneratedColumn()
        id:number

        @Column()
        nome:string

    
    }