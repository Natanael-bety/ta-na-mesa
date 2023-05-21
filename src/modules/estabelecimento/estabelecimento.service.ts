import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';
import { Estabelecimento } from 'src/models/estabelecimento.model';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UPLOAD_PRESETS } from '../cloudinary/constants';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ImagemService } from '../imagem/imagem.service';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @InjectModel(Estabelecimento)
    private estabelecimentoModel: typeof Estabelecimento,
    private readonly cloudinaryService: CloudinaryService,
    private readonly imagemService: ImagemService,
    private sequelize: Sequelize,
  ) {}

  async create({ imagem, nome, descricao = '' }: CreateEstabelecimentoDto) {
    const imagemEnviada = await this.cloudinaryService.uploadImage(imagem, {
      upload_preset: UPLOAD_PRESETS.ESTABELECIMENTOS,
    });

    const transaction = await this.sequelize.transaction();

    try {
      const estabelecimento = await this.estabelecimentoModel.create(
        {
          nome,
          descricao,
        },
        { transaction },
      );

      const imagemEstabelecimento = await this.imagemService.create(
        {
          publicId: imagemEnviada.public_id,
          url: imagemEnviada.url,
          version: imagemEnviada.version,
          estabelecimentoId: estabelecimento.id,
        },
        { transaction },
      );

      await transaction.commit();

      return {
        ...estabelecimento.toJSON(),
        imagem: imagemEstabelecimento.toJSON(),
      };
    } catch (err) {
      await this.cloudinaryService.deleteImage(imagemEnviada.public_id);
      await transaction.rollback();
      throw err;
    }
  }

  async getById(estabelecimentoId: string) {
    const estabelecimento = await this.estabelecimentoModel.findOne({
      where: {
        id: estabelecimentoId,
      },
    });

    if (!estabelecimento) {
      throw new NotFoundException('Estabelecimento não encontrado');
    }

    return estabelecimento;
  }

  findAll() {
    return `This action returns all estabelecimento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estabelecimento`;
  }

  update(id: number, updateEstabelecimentoDto: UpdateEstabelecimentoDto) {
    return `This action updates a #${id} estabelecimento`;
  }

  remove(id: number) {
    return `This action removes a #${id} estabelecimento`;
  }
}
