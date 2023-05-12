import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutoDto } from './create-produto.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  imagem?: string;

  @IsNotEmpty()
  @IsString()
  estoque: string;

  @IsNotEmpty()
  @IsNumber()
  preco: number;

  @IsNotEmpty()
  @IsString()
  descricao: string;
}
