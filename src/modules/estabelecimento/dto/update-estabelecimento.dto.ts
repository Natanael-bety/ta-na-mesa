import { PartialType } from '@nestjs/mapped-types';
import { CreateEstabelecimentoDto } from './create-estabelecimento.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import {
  IsFile,
  MaxFileSize,
  HasMimeType,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { toMb } from 'src/utils/transform';
import { IMAGE_EXTESION_ARRAY } from 'src/constants/utils';

export class UpdateEstabelecimentoDto extends PartialType(
  CreateEstabelecimentoDto,
) {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsFile()
  @MaxFileSize(toMb(10))
  @HasMimeType(IMAGE_EXTESION_ARRAY)
  imagem: MemoryStoredFile;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  descricao?: string;
}
