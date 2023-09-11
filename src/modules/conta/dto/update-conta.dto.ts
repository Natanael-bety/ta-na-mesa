import { PartialType } from '@nestjs/mapped-types';
import { CreateContaDto } from './create-conta.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateContaDto extends PartialType(CreateContaDto) {
  @IsNotEmpty()
  @IsBoolean()
  aberta: boolean;
}
