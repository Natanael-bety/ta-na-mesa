import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';
import { Estabelecimento } from 'src/models/estabelecimento.model';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UPLOAD_PRESETS } from '../cloudinary/constants';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Includeable, Transaction, WhereOptions } from 'sequelize';
import { ImagemService } from '../imagem/imagem.service';
import { Imagem } from 'src/models/imagem.model';
import { MemoryStoredFile } from 'nestjs-form-data';

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

  async getById(
    estabelecimentoId: string,
    { include }: { include?: Includeable | Includeable[] } = {},
  ): Promise<Estabelecimento> {
    const produto: Estabelecimento = await this.estabelecimentoModel.findOne({
      where: { id: estabelecimentoId },
      include,
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return produto;
  }

  async findAll() {
    try {
      const { count, rows } = await this.estabelecimentoModel.findAndCountAll();

      return {
        data: rows,
        totalCount: count,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(estabelecimentoId: string): Promise<Estabelecimento> {
    const estabelecimento = await this.estabelecimentoModel.findOne({
      where: {
        id: estabelecimentoId,
      },
    });

    if (!estabelecimento) {
      throw new NotFoundException('Não encontrada');
    }

    return estabelecimento;
  }

  async update(
    estabelecimentoId: string,
    updateEstabelecimentoDto: UpdateEstabelecimentoDto,
  ) {
    const estabelecimento = await this.getById(estabelecimentoId, {
      include: { model: Imagem },
    });

    const { imagem, ...produtoUpdateData } = updateEstabelecimentoDto;

    const transaction = await this.sequelize.transaction();
    const novoEstabelecimento: Estabelecimento = await estabelecimento.update({
      ...produtoUpdateData,
    });

    if (imagem) {
      await this.imagemService.delete(estabelecimento.imagem.publicId);

      const novaImagem: Imagem = await this.createImagemEstabelecimento(
        imagem,
        estabelecimento.id,
        transaction,
      );

      return { ...novoEstabelecimento.toJSON(), imagem: novaImagem.toJSON() };
    }

    return {
      ...novoEstabelecimento.toJSON(),
      imagem: estabelecimento.imagem.toJSON(),
    };
  }

  remove(estabelecimentoId: string): void {
    this.estabelecimentoModel.destroy({ where: { id: estabelecimentoId } });
  }

  private async createImagemEstabelecimento(
    imagem: MemoryStoredFile,
    estabelecimentoId: string,
    transaction?: Transaction,
  ): Promise<Imagem> {
    const { public_id, url, version } =
      await this.cloudinaryService.uploadImage(imagem, {
        upload_preset: UPLOAD_PRESETS.PRODUTOS,
      });

    return await this.imagemService.create(
      {
        publicId: public_id,
        url,
        version,
        estabelecimentoId,
      },
      { transaction },
    );
  }
}
