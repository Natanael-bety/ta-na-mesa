import { PartialType } from '@nestjs/mapped-types';
import { CreateChamadaDto } from './create-chamada.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateChamada extends PartialType(CreateChamadaDto) {
  @IsNotEmpty()
  @IsBoolean()
  chamadoMesa: boolean;

  @IsNotEmpty()
  @IsBoolean()
  chamadaConta: boolean;

  @IsNotEmpty()
  @IsBoolean()
  chamadaCozinha: boolean;
}
