import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Categoria } from 'src/models/categoria.model';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';
import { PaginationDto } from '../common/validators/pagination.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria) private readonly categoriaModel: typeof Categoria,
    private readonly estabelecimentoService: EstabelecimentoService,
  ) {}

  async create({ nome }: CreateCategoriaDto, estabelecimentoId: string) {
    const estabelecimento = await this.estabelecimentoService.getById(
      estabelecimentoId,
    );

    try {
      const categoria = await this.categoriaModel.create({
        estabelecimentoId: estabelecimento.id,
        nome,
      });

      return categoria.toJSON();
    } catch (err) {
      throw new BadRequestException(new Error(err).message);
    }
  }

  async findAllByEstabelecimentoId(
    estabelecimentoId: string,
    { limit, offset }: PaginationDto,
  ) {
    try {
      const { count, rows } = await this.categoriaModel.findAndCountAll({
        where: { estabelecimentoId },
        limit,
        offset,
      });

      return {
        data: rows,
        totalCount: count,
      };
    } catch (err) {
      throw new BadRequestException(new Error(err).message);
    }
  }

  async getById(categoriaId: string) {
    const categoria = await this.categoriaModel.findOne({
      where: { id: categoriaId },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return categoria;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoria`;
  }

  async update(
    categoriaId: string,
    { nome }: UpdateCategoriaDto,
  ): Promise<Categoria> {
    try {
      const categoria: Categoria = await this.categoriaModel.findByPk(
        categoriaId,
        {
          rejectOnEmpty: true,
        },
      );
      const novaCategoria: Categoria = await categoria.update({
        nome,
      });

      return novaCategoria;
    } catch (err) {
      throw new BadRequestException(new Error(err).message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
