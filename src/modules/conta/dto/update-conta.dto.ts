import { PartialType } from '@nestjs/mapped-types';
import { CreateContaDto } from './create-conta.dto';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateContaDto extends PartialType(CreateContaDto) {
  @IsNotEmpty()
  @IsNumber()
  valorTotal: number;

  @IsNotEmpty()
  @IsBoolean()
  aberta: boolean;
}
