import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { IMAGE_EXTESION_ARRAY } from 'src/constants/utils';
import { toMb } from 'src/utils/transform';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsFile()
  @MaxFileSize(toMb(10))
  @HasMimeType(IMAGE_EXTESION_ARRAY)
  imagem: MemoryStoredFile;

  @IsNumber()
  @Type(() => Number)
  @IsInt()
  estoque: number;

  @IsNumber()
  @Type(() => Number)
  preco: number;

  @IsNotEmpty()
  @IsString()
  descricao: string;
}
