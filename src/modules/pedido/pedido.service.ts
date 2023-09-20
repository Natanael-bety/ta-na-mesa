import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Pedido } from 'src/models/pedido.model';
import { UsuarioService } from '../usuario/usuario.service';
import { ContaService } from '../conta/conta.service';
import { CreateUsuarioDto } from '../auth/dto/create-usuario.dto';
import { NotFoundError } from 'src/common/error/types/notFound.error';
// import { ContaService } from '../conta/conta.service';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(Pedido) private readonly pedidoModel: typeof Pedido,
    private readonly usuarioService: UsuarioService,
  ) {}
  async create(
    usuarioId: string,
    { ...createPedidoDto }: CreatePedidoDto,
  ): Promise<Pedido> {
    const usuario = await this.usuarioService.findById(usuarioId);
    try {
      const pedidoNovo: Pedido = await this.pedidoModel.create({
        usuarioId: usuario.id,
        ...createPedidoDto,
      });

      return pedidoNovo.toJSON();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAllByUsuarioId(usuarioId: string) {
    try {
      const { count, rows } = await this.pedidoModel.findAndCountAll({
        where: { usuarioId },
      });

      return {
        data: rows,
        totalCount: count,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(pedidoId: string): Promise<Pedido> {
    const pedido = await this.pedidoModel.findOne({
      where: {
        id: pedidoId,
      },
    });

    if (!pedido) {
      throw new NotFoundError('Pedido não encontrada');
    }

    return pedido;
  }

  async update(
    pedidoId: string,
    updatePedidoDto: UpdatePedidoDto,
  ): Promise<Pedido> {
    try {
      const pedido = await this.findOne(pedidoId);

      const { ...pedidoUpdatedete } = updatePedidoDto;

      const novoPedido: Pedido = await pedido.update({ ...pedidoUpdatedete });

      return novoPedido;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async remove(pedidoId: string): Promise<void> {
    try {
      const pedidoExist: Pedido = await this.pedidoModel.findByPk(pedidoId);

      if (!pedidoExist) {
        throw new NotFoundError('Pedido não encontrado');
      }

      await this.pedidoModel.destroy({
        where: { id: pedidoId },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async restaure(pedidoId: string): Promise<void> {
    try {
      const pedidoExist: Pedido = await this.pedidoModel.findByPk(pedidoId);

      if (!pedidoExist) {
        throw new NotFoundError('Pedido não encontrado');
      }

      await this.pedidoModel.restore({
        where: { id: pedidoId },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
