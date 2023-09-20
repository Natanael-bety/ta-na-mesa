import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from 'src/models/pedido.model';
import { TotalCountInterceptor } from 'src/config/interceptors/total-count.interceptor';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post('/usuario/:usuarioId')
  create(
    @Param('usuarioId') usuarioId: string,
    @Body() createPedidoDto: CreatePedidoDto,
  ): Promise<Pedido> {
    return this.pedidoService.create(usuarioId, createPedidoDto);
  }

  @Get('/usuario/:usuarioId')
  @UseInterceptors(TotalCountInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  findAllByUsuarioId(@Param('usuarioId') usuarioId: string) {
    return this.pedidoService.findAllByUsuarioId(usuarioId);
  }

  @Get(':pedidoId')
  findOne(@Param('pedidoId') pedidoId: string): Promise<Pedido> {
    return this.pedidoService.findOne(pedidoId);
  }

  @Put(':pedidoId')
  update(
    @Param('pedidoId') pedidoId: string,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ): Promise<Pedido> {
    return this.pedidoService.update(pedidoId, updatePedidoDto);
  }

  @Delete(':pedidoId')
  remove(@Param('pedidoId') pedidoId: string): Promise<void> {
    return this.pedidoService.remove(pedidoId);
  }

  @Put('pedido/:pedidoId')
  restaure(@Param('pedidoId') pedidoId: string): Promise<void> {
    return this.pedidoService.restaure(pedidoId);
  }
}
