import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { MESA_STATUS } from 'src/constants/mesa';

export class CreateMesaDto {
  @IsNumber()
  @Type(() => Number)
  numero: number;

  @IsNotEmpty()
  @IsEnum(MESA_STATUS)
  status: MESA_STATUS;
}
