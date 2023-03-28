import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PedidoProdutoService } from './pedido-produto.service';
import { CreatePedidoProdutoDto } from './dto/create-pedido-produto.dto';
import { UpdatePedidoProdutoDto } from './dto/update-pedido-produto.dto';

@Controller('pedido-produto')
export class PedidoProdutoController {
  constructor(private readonly pedidoProdutoService: PedidoProdutoService) {}

  @Post()
  create(@Body() createPedidoProdutoDto: CreatePedidoProdutoDto) {
    return this.pedidoProdutoService.create(createPedidoProdutoDto);
  }

  @Get()
  findAll() {
    return this.pedidoProdutoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoProdutoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePedidoProdutoDto: UpdatePedidoProdutoDto,
  ) {
    return this.pedidoProdutoService.update(+id, updatePedidoProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoProdutoService.remove(+id);
  }
}
