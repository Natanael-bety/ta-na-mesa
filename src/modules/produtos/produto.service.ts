import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Produto } from 'src/models/produto.model';
import { CategoriasService } from '../categorias/categorias.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UPLOAD_PRESETS } from '../cloudinary/constants';
import { Sequelize } from 'sequelize-typescript';
import { ImagemService } from '../imagem/imagem.service';
import { PaginationDto } from '../common/validators/pagination.dto';
import { Imagem } from 'src/models/imagem.model';
import { MemoryStoredFile } from 'nestjs-form-data';
import { Includeable, Transaction } from 'sequelize';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectModel(Produto) private readonly produtoModel: typeof Produto,
    private readonly categoriasService: CategoriasService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly imagemService: ImagemService,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createProdutoDto: CreateProdutoDto, categoriaId: string) {
    const categoria = await this.categoriasService.getById(categoriaId);

    const {
      descricao = '',
      estoque = 0,
      imagem,
      nome,
      preco,
    } = createProdutoDto;

    let novaImagem: Imagem;

    const transaction = await this.sequelize.transaction();

    try {
      const produto = await this.produtoModel.create(
        {
          categoriaId: categoria.id,
          nome,
          descricao,
          estoque,
          preco,
        },
        { transaction },
      );

      novaImagem = await this.createImagemProduto(
        imagem,
        produto.id,
        transaction,
      );

      await transaction.commit();

      return {
        ...produto.toJSON(),
        imagem: novaImagem.toJSON(),
      };
    } catch (err) {
      if (novaImagem?.publicId) {
        await this.cloudinaryService.deleteImage(novaImagem.publicId);
      }
      await transaction.rollback();
      throw err;
    }
  }

  async getProdutosPorCategoriaId(
    categoriaId: string,
    { limit, offset }: PaginationDto,
  ) {
    try {
      const { count, rows } = await this.produtoModel.findAndCountAll({
        where: { categoriaId },
        limit,
        offset,
        include: {
          model: Imagem,
        },
      });

      return {
        data: rows,
        totalCount: count,
      };
    } catch (err) {
      throw new BadRequestException(new Error(err).message);
    }
  }

  async getById(
    produtoId: string,
    { include }: { include?: Includeable | Includeable[] } = {},
  ) {
    const produto = await this.produtoModel.findOne({
      where: { id: produtoId },
      include,
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return produto;
  }

  async update(produtoId: string, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.getById(produtoId, {
      include: { model: Imagem },
    });

    const { imagem, ...produtoUpdateData } = updateProdutoDto;

    const transaction = await this.sequelize.transaction();
    const novoProduto = await produto.update({
      ...produtoUpdateData,
    });

    if (imagem) {
      await this.imagemService.delete(produto.imagem.publicId);

      const novaImagem = await this.createImagemProduto(
        imagem,
        produto.id,
        transaction,
      );

      return { ...novoProduto.toJSON(), imagem: novaImagem.toJSON() };
    }

    return { ...novoProduto.toJSON(), imagem: produto.imagem.toJSON() };
  }

  private async createImagemProduto(
    imagem: MemoryStoredFile,
    produtoId: string,
    transaction?: Transaction,
  ) {
    const { public_id, url, version } =
      await this.cloudinaryService.uploadImage(imagem, {
        upload_preset: UPLOAD_PRESETS.PRODUTOS,
      });

    return await this.imagemService.create(
      {
        publicId: public_id,
        url,
        version,
        produtoId,
      },
      { transaction },
    );
  }

  remove(produtoId: string) {
    this.produtoModel.destroy({ where: { id: produtoId } });
  }
}
