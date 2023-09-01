import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutosController } from './produto.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Produto } from 'src/models/produto.model';
import { CategoriasModule } from '../categorias/categorias.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ImagemModule } from '../imagem/imagem.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutoService],
  imports: [
    SequelizeModule.forFeature([Produto]),
    CategoriasModule,
    CloudinaryModule,
    ImagemModule,
    NestjsFormDataModule,
  ],
})
export class ProdutoModule {}
