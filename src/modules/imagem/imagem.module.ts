import { Module } from '@nestjs/common';
import { ImagemService } from './imagem.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Imagem } from 'src/models/imagem.model';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  providers: [ImagemService],
  exports: [ImagemService],
  imports: [SequelizeModule.forFeature([Imagem]), CloudinaryService],
})
export class ImagemModule {}
