import { Module } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { MesaController } from './mesa.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Mesa } from 'src/models/mesa.model';
import { EstabelecimentoModule } from '../estabelecimento/estabelecimento.module';

@Module({
  controllers: [MesaController],
  providers: [MesaService],
  imports: [SequelizeModule.forFeature([Mesa]), EstabelecimentoModule],
})
export class MesaModule {}
