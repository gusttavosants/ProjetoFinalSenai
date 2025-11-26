import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber, IsPositive, IsOptional, IsBoolean } from "class-validator";

export class CreateDto {
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @IsString({ message: 'Nome deve ser uma string' })
    @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
    nome: string;

    @IsNotEmpty({ message: 'Descrição é obrigatória' })
    @IsString({ message: 'Descrição deve ser uma string' })
    @MinLength(5, { message: 'Descrição deve ter no mínimo 5 caracteres' })
    @MaxLength(500, { message: 'Descrição deve ter no máximo 500 caracteres' })
    descricao: string;

    @IsNotEmpty({ message: 'Preço é obrigatório' })
    @IsNumber({}, { message: 'Preço deve ser um número' })
    @IsPositive({ message: 'Preço deve ser maior que zero' })
    preco: number;

    @IsOptional()
    @IsBoolean({ message: 'Status deve ser um booleano' })
    status?: boolean;
}