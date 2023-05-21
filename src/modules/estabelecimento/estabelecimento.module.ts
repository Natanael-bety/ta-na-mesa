import { Module } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoController } from './estabelecimento.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Estabelecimento } from '../../models/estabelecimento.model';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Imagem } from 'src/models/imagem.model';

@Module({
  controllers: [EstabelecimentoController],
  providers: [EstabelecimentoService],
  imports: [
    SequelizeModule.forFeature([Estabelecimento, Imagem]),
    CloudinaryModule,
  ],
})
export class EstabelecimentoModule {}
