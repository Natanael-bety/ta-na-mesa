import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePedidoProdutoDto {
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
