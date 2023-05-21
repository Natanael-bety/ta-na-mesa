import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Categoria } from 'src/models/categoria.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { EstabelecimentoModule } from '../estabelecimento/estabelecimento.module';

@Module({
  controllers: [CategoriasController],
  providers: [CategoriasService],
  imports: [SequelizeModule.forFeature([Categoria]), EstabelecimentoModule],
})
export class CategoriasModule {}
