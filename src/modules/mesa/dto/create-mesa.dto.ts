import { Type } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';
import { MESA_STATUS } from 'src/constants/mesa';

export class CreateMesaDto {
  @IsNumber()
  @Type(() => Number)
  numero: number;

  @IsEnum(MESA_STATUS)
  status: MESA_STATUS;
}
