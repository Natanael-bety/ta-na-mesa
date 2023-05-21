import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Imagem } from 'src/models/imagem.model';
import { CreateImagemDto } from './dto/create-imagem.dto';

@Injectable()
export class ImagemService {
  constructor(
    @InjectModel(Imagem) private readonly imagemModel: typeof Imagem,
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
}
