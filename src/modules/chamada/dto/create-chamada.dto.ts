import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { CHAMADA } from 'src/constants/chamada';

export class CreateChamadaDto {
  @IsEnum(CHAMADA)
  chamada: CHAMADA;

  @IsNotEmpty()
  @IsBoolean()
  chamadaResolvida: boolean;
}
