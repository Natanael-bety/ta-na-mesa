import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateChamadaDto {
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
