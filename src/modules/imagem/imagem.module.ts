import { Module } from '@nestjs/common';
import { ImagemService } from './imagem.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Imagem } from 'src/models/imagem.model';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  providers: [ImagemService],
  exports: [ImagemService],
  imports: [SequelizeModule.forFeature([Imagem]), CloudinaryModule],
})
export class ImagemModule {}
