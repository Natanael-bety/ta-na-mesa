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
import { Imagem } from 'src/models/imagem.model';
import { MemoryStoredFile } from 'nestjs-form-data';
import { Includeable, Transaction, WhereOptions } from 'sequelize';
import { GetProdutosPorEstabelecimento } from './dto/get-produtos-por-estabelecimento.dto';
import { Estabelecimento } from 'src/models/estabelecimento.model';
import { Categoria } from 'src/models/categoria.model';
import { GetProdutosPorCategoria } from './dto/get-produtos-por-categoria.dto';
import { UnauthorizedError } from 'src/common/error/types/unauthorized.error';
import { NotFoundError } from 'src/common/error/types/notFound.error';

@Injectable()
export class ProdutoService {
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
          estabelecimentoId: categoria.estabelecimentoId,
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
      throw new UnauthorizedError('Não autorizado');
    }
  }

  async getProdutorPorEstabelecimento(
    estabelecimentoId: string,
    { limit, offset, categoriaId }: GetProdutosPorEstabelecimento,
  ) {
    try {
      const whereOptions: WhereOptions<Produto> = {
        estabelecimentoId,
      };

      if (categoriaId) {
        whereOptions.categoriaId = categoriaId;
      }

      const { count, rows } = await this.produtoModel.findAndCountAll({
        where: whereOptions,
        limit,
        offset,
        include: [
          {
            model: Imagem,
          },
        ],
      });

      return {
        data: rows,
        totalCount: count,
      };
    } catch (err) {
      throw new BadRequestException(new Error(err).message);
    }
  }

  async getProdutoPorCategoria(
    categoriaId: string,
    { limit, offset, estabelecimentoId }: GetProdutosPorCategoria,
  ) {
    try {
      const whereOptions: WhereOptions<Produto> = {
        categoriaId,
      };
      if (estabelecimentoId) {
        whereOptions.estabelecimentoId = estabelecimentoId;
      }

      const { count, rows } = await this.produtoModel.findAndCountAll({
        where: whereOptions,
        limit,
        offset,
        include: [
          {
            model: Imagem,
          },
        ],
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
  ): Promise<Produto> {
    const produto = await this.produtoModel.findOne({
      where: { id: produtoId },
      include,
    });

    if (!produto) {
      throw new NotFoundError('Produto não encontrado');
    }

    return produto;
  }

  async update(produtoId: string, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.getById(produtoId, {
      include: { model: Imagem },
    });

    const { imagem, ...produtoUpdateData } = updateProdutoDto;

    const transaction = await this.sequelize.transaction();
    const novoProduto: Produto = await produto.update({
      ...produtoUpdateData,
    });

    if (imagem) {
      await this.imagemService.delete(produto.imagem.publicId);

      const novaImagem: Imagem = await this.createImagemProduto(
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
        produtoId,
      },
      { transaction },
    );
  }

  async remove(produtoId: string): Promise<void> {
    try {
      const produtoExist: Produto = await this.produtoModel.findByPk(produtoId);

      if (!produtoExist) {
        throw new NotFoundError('Produto não encontrado');
      }

      await this.produtoModel.destroy({
        where: { id: produtoId },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async restaure(produtoId: string): Promise<void> {
    try {
      const produtoExist: Produto = await this.produtoModel.findByPk(produtoId);

      if (!produtoExist) {
        throw new NotFoundError('Produto não encontrado');
      }

      await this.produtoModel.restore({
        where: { id: produtoId },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
