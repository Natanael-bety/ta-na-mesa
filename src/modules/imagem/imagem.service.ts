import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Imagem } from 'src/models/imagem.model';
import { CreateImagemDto } from './dto/create-imagem.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ImagemService {
  constructor(
    @InjectModel(Imagem) private readonly imagemModel: typeof Imagem,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createImagemDto: CreateImagemDto,
    { transaction }: { transaction?: Transaction } = {},
  ) {
    const imagem = await this.imagemModel.create(createImagemDto, {
      transaction,
    });

    return imagem;
  }

  async delete(imagemId: string) {
    await this.imagemModel.destroy({ where: { id: imagemId } });
  }
}
