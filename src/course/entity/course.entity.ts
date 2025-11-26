import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
    export class Course{
        @PrimaryGeneratedColumn()
        id:number

        @Column()
        nome:string

        @Column()
        descricao:String

        @Column()
        preco:number

        @Column({default : 'ativo'})
        status:string
    }