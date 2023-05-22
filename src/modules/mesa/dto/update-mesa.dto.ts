import { PartialType } from '@nestjs/mapped-types';
import { CreateMesaDto } from './create-mesa.dto';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { MESA_STATUS } from 'src/constants/mesa';
import { Type } from 'class-transformer';

export class UpdateMesaDto extends PartialType(CreateMesaDto) {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  numero: number;

  @IsNotEmpty()
  @IsEnum(MESA_STATUS)
  status: MESA_STATUS;
}
