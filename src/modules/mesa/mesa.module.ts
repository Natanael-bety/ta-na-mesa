import { Module } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { MesaController } from './mesa.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EstabelecimentoModule } from '../estabelecimento/estabelecimento.module';
import { Mesa } from 'src/models/mesa.model';

@Module({
  controllers: [MesaController],
  providers: [MesaService],
  imports: [SequelizeModule.forFeature([Mesa]), EstabelecimentoModule],
  exports: [MesaService],
})
export class MesaModule {}
