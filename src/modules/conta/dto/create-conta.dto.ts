import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateContaDto {
  @IsNotEmpty()
  @IsNumber()
  valorTotal: number;

  @IsNotEmpty()
  @IsDate()
  finalizadoEm: Date;
}
