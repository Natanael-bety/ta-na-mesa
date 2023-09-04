import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateContaDto {
  @IsNotEmpty()
  @IsNumber()
  valorTotal: number;

  @IsNotEmpty()
  @IsBoolean()
  aberta: boolean;
}
