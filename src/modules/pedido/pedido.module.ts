import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pedido } from '../../models/pedido.model';

@Module({
  controllers: [PedidoController],
  providers: [PedidoService],
  imports: [SequelizeModule.forFeature([Pedido])],
})
export class PedidoModule {}
