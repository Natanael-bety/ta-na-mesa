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
// import { ContaService } from '../conta/conta.service';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(Pedido) private readonly pedidoModel: typeof Pedido,
    private readonly usuarioService: UsuarioService,
  ) {}
  async create(
    usuarioId: string,
    {
      numero,
      alteradoEm,
      canceladoEm,
      entegueEm,
      preparandoEm,
      prontoEm,
      status,
      valorTotal,
    }: CreatePedidoDto,
  ): Promise<Pedido> {
    const usuario = await this.usuarioService.findById(usuarioId);
    try {
      const pedidoNovo: Pedido = await this.pedidoModel.create({
        usuarioId: usuario.id,
        numero,
        alteradoEm,
        canceladoEm,
        entegueEm,
        preparandoEm,
        prontoEm,
        status,
        valorTotal,
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
      throw new NotFoundException('Pedido não encontrada');
    }

    return pedido;
  }

  async update(
    pedidoId: string,
    updatePedidoDto: UpdatePedidoDto,
  ): Promise<Pedido> {
    const pedido = await this.findOne(pedidoId);

    const { ...pedidoUpdatedete } = updatePedidoDto;

    const novoPedido: Pedido = await pedido.update({ ...pedidoUpdatedete });

    return novoPedido;
  }

  remove(pedidoId: string) {
    this.pedidoModel.destroy({ where: { id: pedidoId } });
  }
}
