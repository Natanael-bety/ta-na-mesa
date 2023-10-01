import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePedidoProdutoDto } from './dto/create-pedido-produto.dto';
import { UpdatePedidoProdutoDto } from './dto/update-pedido-produto.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PedidoProduto } from 'src/models/pedido-produto.model';
import { PedidoService } from '../pedido/pedido.service';
import { ProdutoService } from '../produtos/produto.service';
import { NotFoundError } from 'src/common/error/types/notFound.error';
import { catchError } from 'rxjs';

@Injectable()
export class PedidoProdutoService {
  constructor(
    @InjectModel(PedidoProduto)
    private readonly pedidoProdutoModel: typeof PedidoProduto,
    private readonly pedidoService: PedidoService,
    private readonly produtoService: ProdutoService,
  ) {}
  async create(
    pedidoId: string,
    produtoId: string,
    {
      quantidade,
      novaQuantidade,
      observacao,
      precoUnitario,
    }: CreatePedidoProdutoDto,
  ): Promise<PedidoProduto> {
    const pedido = await this.pedidoService.findOne(pedidoId);
    const produto = await this.produtoService.getById(produtoId);
    try {
      const pedidoNovo: PedidoProduto = await this.pedidoProdutoModel.create({
        pedidoId: pedido.id,
        produtoId: produto.id,
        quantidade,
        observacao,
        novaQuantidade,
        precoUnitario,
      });
      return pedidoNovo.toJSON();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAllByPedidoId(pedidoId: string) {
    try {
      const { count, rows } = await this.pedidoProdutoModel.findAndCountAll({
        where: { pedidoId },
      });

      return {
        data: rows,
        totalCount: count,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(pedidoProdutoId: string): Promise<PedidoProduto> {
    const pedidoProduto = await this.pedidoProdutoModel.findOne({
      where: {
        id: pedidoProdutoId,
      },
    });

    if (!pedidoProduto) {
      throw new NotFoundError('Não encontrada');
    }

    return pedidoProduto;
  }

  async findPedidoProduto(
    pedidoProdutoId: string,
    pedidoId: string,
    contaId: string,
  ): Promise<PedidoProduto> {
    const pedido = await this.pedidoService.findPedidoConta(pedidoId, contaId);

    try {
      const pedidoProduto = await this.pedidoProdutoModel.findOne({
        where: {
          id: pedidoProdutoId,
          pedido,
        },
      });

      if (!pedidoProduto) {
        throw new NotFoundError('Não encontrado');
      }

      return pedidoProduto;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async update(
    pedidoProdutoId: string,
    updatePedidoProdutoDto: UpdatePedidoProdutoDto,
  ): Promise<PedidoProduto> {
    const pedidoProduto: PedidoProduto = await this.findOne(pedidoProdutoId);

    const { quantidade, observacao, novaQuantidade, precoUnitario } =
      updatePedidoProdutoDto;

    const novoPedido: PedidoProduto = await pedidoProduto.update({
      quantidade,
      observacao,
      novaQuantidade,
      precoUnitario,
    });

    return novoPedido;
  }

  remove(pedidoProdutoId: string): void {
    this.pedidoProdutoModel.destroy({ where: { id: pedidoProdutoId } });
  }
}
