import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cliente } from 'src/models/cliente.model';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService],
  imports: [SequelizeModule.forFeature([Cliente])],
})
export class ClienteModule {}
