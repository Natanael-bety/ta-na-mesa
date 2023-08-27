import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateChamadaDto {
  @IsNotEmpty()
  @IsBoolean()
  chamadaResolvida: boolean;
}
