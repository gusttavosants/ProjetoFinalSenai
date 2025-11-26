import { IsOptional, IsString, MinLength, MaxLength, IsNumber, IsPositive, IsBoolean } from "class-validator";

export class UpdateDto {
    @IsOptional()
    @IsString({ message: 'Nome deve ser uma string' })
    @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
    nome?: string;

    @IsOptional()
    @IsString({ message: 'Descrição deve ser uma string' })
    @MinLength(5, { message: 'Descrição deve ter no mínimo 5 caracteres' })
    @MaxLength(500, { message: 'Descrição deve ter no máximo 500 caracteres' })
    descricao?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Preço deve ser um número' })
    @IsPositive({ message: 'Preço deve ser maior que zero' })
    preco?: number;

    @IsOptional()
    @IsBoolean({ message: 'Status deve ser um booleano' })
    status?: boolean;
}