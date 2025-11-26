import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Collaborator {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    email: string;

    @Column()
    senha: string;

    @Column({ default: true })
    ativo: boolean;
}