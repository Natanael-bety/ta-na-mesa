import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoProdutoDto } from './create-pedido-produto.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePedidoProdutoDto extends PartialType(
  CreatePedidoProdutoDto,
) {
  @IsNotEmpty()
  @IsNumber()
  quantidade: number;

  @IsNotEmpty()
  @IsNumber()
  novaQuantidade: number;

  @IsNotEmpty()
  @IsString()
  observacao: string;

  @IsNotEmpty()
  @IsNumber()
  precoUnitario: number;
}
