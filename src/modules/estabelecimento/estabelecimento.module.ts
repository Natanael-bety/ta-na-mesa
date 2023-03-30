import { Module } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoController } from './estabelecimento.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Estabelecimento } from '../../models/estabelecimento.model';

@Module({
  controllers: [EstabelecimentoController],
  providers: [EstabelecimentoService],
  imports: [SequelizeModule.forFeature([Estabelecimento])],
})
export class EstabelecimentoModule {}
