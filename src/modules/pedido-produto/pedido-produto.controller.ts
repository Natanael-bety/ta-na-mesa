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
import { PedidoProdutoService } from './pedido-produto.service';
import { CreatePedidoProdutoDto } from './dto/create-pedido-produto.dto';
import { UpdatePedidoProdutoDto } from './dto/update-pedido-produto.dto';
import { PedidoProduto } from 'src/models/pedido-produto.model';
import { TotalCountInterceptor } from 'src/config/interceptors/total-count.interceptor';

@Controller('pedido-produto')
export class PedidoProdutoController {
  constructor(private readonly pedidoProdutoService: PedidoProdutoService) {}

  @Post('/pedido/:pedidoId/:produtoId')
  create(
    @Param('pedidoId') usuarioId: string,
    @Param('produtoId') produtoId: string,
    @Body() createPedidoProdutoDto: CreatePedidoProdutoDto,
  ): Promise<PedidoProduto> {
    return this.pedidoProdutoService.create(
      usuarioId,
      produtoId,
      createPedidoProdutoDto,
    );
  }

  @Get('/:pedidoProdutoId/:pedidoId/:contaId')
  @UseInterceptors(TotalCountInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  findPedidoProduto(
    @Param('pedidoId') pedidoId: string,
    @Param('pedidoProdutoId') pedidoProdutoId: string,
    @Param('contaId') contaId: string,
  ) {
    return this.pedidoProdutoService.findPedidoProduto(
      pedidoId,
      pedidoProdutoId,
      contaId,
    );
  }

  @Get('/pedido/:pedidoId')
  @UseInterceptors(TotalCountInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  findAllByUsuarioId(@Param('pedidoId') pedidoId: string) {
    return this.pedidoProdutoService.findAllByPedidoId(pedidoId);
  }

  @Get(':pedidoProdutoId')
  findOne(
    @Param('pedidoProdutoId') pedidoProdutoId: string,
  ): Promise<PedidoProduto> {
    return this.pedidoProdutoService.findOne(pedidoProdutoId);
  }

  @Put(':pedidoProdutoId')
  update(
    @Param('pedidoProdutoId') pedidoProdutoId: string,
    @Body() updatePedidoDto: UpdatePedidoProdutoDto,
  ): Promise<PedidoProduto> {
    return this.pedidoProdutoService.update(pedidoProdutoId, updatePedidoDto);
  }

  @Delete(':pedidoProdutoId')
  remove(@Param('pedidoProdutoId') pedidoProdutoId: string): void {
    return this.pedidoProdutoService.remove(pedidoProdutoId);
  }
}
