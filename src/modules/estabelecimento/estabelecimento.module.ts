import { Module } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoController } from './estabelecimento.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Estabelecimento } from '../../models/estabelecimento.model';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ImagemModule } from '../imagem/imagem.module';

@Module({
  controllers: [EstabelecimentoController],
  providers: [EstabelecimentoService],
  imports: [
    SequelizeModule.forFeature([Estabelecimento]),
    CloudinaryModule,
    NestjsFormDataModule,
    ImagemModule,
  ],
  exports: [EstabelecimentoService],
})
export class EstabelecimentoModule {}
