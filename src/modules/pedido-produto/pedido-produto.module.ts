import { Module } from '@nestjs/common';
import { PedidoProdutoService } from './pedido-produto.service';
import { PedidoProdutoController } from './pedido-produto.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PedidoProduto } from '../../models/pedido-produto.model';
import { PedidoModule } from '../pedido/pedido.module';
import { ProdutoModule } from '../produtos/produto.module';

@Module({
  controllers: [PedidoProdutoController],
  providers: [PedidoProdutoService],
  imports: [
    SequelizeModule.forFeature([PedidoProduto]),
    PedidoModule,
    ProdutoModule,
  ],
})
export class PedidoProdutoModule {}
