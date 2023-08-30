import { Module } from '@nestjs/common';
import { ContaClienteService } from './conta-cliente.service';
import { ContaClienteController } from './conta-cliente.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContaCliente } from '../../models/conta-cliente.model';

@Module({
  controllers: [ContaClienteController],
  providers: [ContaClienteService],
  imports: [SequelizeModule.forFeature([ContaCliente])],
})
export class PedidoModule {}
