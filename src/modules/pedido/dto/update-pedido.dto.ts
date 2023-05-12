import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './create-pedido.dto';
import { IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { STATUS_PEDIDO } from 'src/constants/pedido';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {
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
  @IsDate()
  canceladoEm: Date;

  @IsNotEmpty()
  @IsDate()
  preparandoEm: Date;

  @IsNotEmpty()
  @IsDate()
  prontoEm: Date;

  @IsNotEmpty()
  @IsDate()
  entegueEm: Date;

  @IsNotEmpty()
  @IsDate()
  alteradoEm: Date;
}
