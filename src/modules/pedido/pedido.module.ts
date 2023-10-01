import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pedido } from '../../models/pedido.model';
import { UsuarioModule } from '../usuario/usuario.module';
import { ContaModule } from '../conta/conta.module';

@Module({
  controllers: [PedidoController],
  providers: [PedidoService],
  imports: [SequelizeModule.forFeature([Pedido]), UsuarioModule, ContaModule],
  exports: [PedidoService],
})
export class PedidoModule {}
