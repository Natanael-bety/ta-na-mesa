import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pedido } from '../../models/pedido.model';
import { UsuarioModule } from '../usuario/usuario.module';
import { ContaModule } from '../conta/conta.module';
import { MesaModule } from '../mesa/mesa.module';
import { EstabelecimentoModule } from '../estabelecimento/estabelecimento.module';

@Module({
  controllers: [PedidoController],
  providers: [PedidoService],
  imports: [
    SequelizeModule.forFeature([Pedido]),
    ContaModule,
    UsuarioModule,
    MesaModule,
    EstabelecimentoModule,
  ],
  exports: [PedidoService],
})
export class PedidoModule {}
