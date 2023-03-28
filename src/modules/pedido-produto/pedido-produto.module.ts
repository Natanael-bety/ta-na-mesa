import { Module } from '@nestjs/common';
import { PedidoProdutoService } from './pedido-produto.service';
import { PedidoProdutoController } from './pedido-produto.controller';

@Module({
  controllers: [PedidoProdutoController],
  providers: [PedidoProdutoService],
})
export class PedidoProdutoModule {}
