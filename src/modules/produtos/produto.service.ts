import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Produto } from 'src/models/produto.model';
import { CategoriasService } from '../categorias/categorias.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UPLOAD_PRESETS } from '../cloudinary/constants';
import { Sequelize } from 'sequelize-typescript';
import { ImagemService } from '../imagem/imagem.service';

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

    const imagemEnviada = await this.cloudinaryService.uploadImage(imagem, {
      upload_preset: UPLOAD_PRESETS.PRODUTOS,
    });

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

      const imagemProduto = await this.imagemService.create(
        {
          publicId: imagemEnviada.public_id,
          url: imagemEnviada.url,
          version: imagemEnviada.version,
          produtoId: produto.id,
        },
        { transaction },
      );

      await transaction.commit();

      return {
        ...produto.toJSON(),
        imagem: imagemProduto.toJSON(),
      };
    } catch (err) {
      await this.cloudinaryService.deleteImage(imagemEnviada.public_id);
      await transaction.rollback();
      throw err;
    }
  }

  findAll() {
    return `This action returns all produtos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produto`;
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
