import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateEstabelecimentoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  imagem: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  descricao?: string;
}
