import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
    export class Enrollment{
        @PrimaryGeneratedColumn()
        id:number

        @Column()
        nome:string

        @Column()
        email:string

        @Column()
        cpf:number

        @Column()
        telefone:number

        @Column()
        aniversario:Date

        //IdCourse

        @Column()
        dataCriacao:Date
    }