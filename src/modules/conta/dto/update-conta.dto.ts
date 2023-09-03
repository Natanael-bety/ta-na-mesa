import { PartialType } from '@nestjs/mapped-types';
import { CreateContaDto } from './create-conta.dto';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateContaDto extends PartialType(CreateContaDto) {
  @IsNotEmpty()
  @IsNumber()
  valorTotal: number;
}
