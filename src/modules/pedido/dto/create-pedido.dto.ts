import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { STATUS_PEDIDO } from 'src/constants/pedido';

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsNumber()
  numero: number;

  @IsNotEmpty()
  @IsEnum(STATUS_PEDIDO)
  status: STATUS_PEDIDO;

  @IsNotEmpty()
  @IsNumber()
  valorTotal: number;

  @IsNotEmpty()
  @IsDateString()
  canceladoEm: Date;

  @IsNotEmpty()
  @IsDateString()
  preparandoEm: Date;

  @IsNotEmpty()
  @IsDateString()
  prontoEm: Date;

  @IsNotEmpty()
  @IsDateString()
  entegueEm: Date;

  @IsNotEmpty()
  @IsDateString()
  alteradoEm: Date;
}
