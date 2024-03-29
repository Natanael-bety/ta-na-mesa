import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chamada } from 'src/models/chamada.model';
import { ChamadaService } from './chamada.service';
import { ChamadaController } from './chamada.controller';
import { MesaModule } from '../mesa/mesa.module';

@Module({
  controllers: [ChamadaController],
  providers: [ChamadaService, MesaModule],
  imports: [SequelizeModule.forFeature([Chamada]), MesaModule],
  exports: [ChamadaService],
})
export class ChamadaModule {}
