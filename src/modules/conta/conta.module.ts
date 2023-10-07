import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { ContaController } from './conta.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Conta } from 'src/models/conta.model';
import { MesaModule } from '../mesa/mesa.module';
import { PedidoModule } from '../pedido/pedido.module';

@Module({
  controllers: [ContaController],
  providers: [ContaService],
  imports: [SequelizeModule.forFeature([Conta]), MesaModule],
  exports: [ContaService, ContaModule],
})
export class ContaModule {}
