import { PartialType } from '@nestjs/mapped-types';
import { CreateEstabelecimentoDto } from './create-estabelecimento.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateEstabelecimentoDto extends PartialType(
  CreateEstabelecimentoDto,
) {
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
