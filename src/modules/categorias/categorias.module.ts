import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Categoria } from 'src/models/categoria.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [CategoriasController],
  providers: [CategoriasService],
  imports: [SequelizeModule.forFeature([Categoria])],
})
export class CategoriasModule {}
