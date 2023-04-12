import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { ContaController } from './conta.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Conta } from 'src/models/conta.model';

@Module({
  controllers: [ContaController],
  providers: [ContaService],
  imports: [SequelizeModule.forFeature([Conta])],
})
export class ContaModule {}
