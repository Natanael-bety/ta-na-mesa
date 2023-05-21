import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import {
  IsFile,
  MaxFileSize,
  HasMimeType,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { IMAGE_EXTESION_ARRAY } from 'src/constants/utils';
import { toMb } from 'src/utils/transform';

export class CreateEstabelecimentoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  descricao?: string;

  @IsFile()
  @MaxFileSize(toMb(10))
  @HasMimeType(IMAGE_EXTESION_ARRAY)
  imagem: MemoryStoredFile;
}
