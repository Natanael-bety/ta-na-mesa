import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Pedido } from 'src/models/pedido.model';
import { UsuarioService } from '../usuario/usuario.service';
import { NotFoundError } from 'src/common/error/types/notFound.error';
import { CreateContaDto } from '../conta/dto/create-conta.dto';
import { Conta } from 'src/models/conta.model';
import { ContaService } from '../conta/conta.service';
import { MesaService } from '../mesa/mesa.service';
import { Includeable } from 'sequelize';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';
import { LessThan, Like, MoreThan } from 'typeorm';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(Pedido) private readonly pedidoModel: typeof Pedido,
    private readonly usuarioService: UsuarioService,
    private readonly contaService: ContaService,
    private readonly mesaService: MesaService,
    private readonly estabelecimentoService: EstabelecimentoService,
  ) {}
  async create(
    usuarioId: string,
    contaId: string,
    { ...createPedidoDto }: CreatePedidoDto,
  ): Promise<Pedido> {
    const usuario = await this.usuarioService.findById(usuarioId);
    try {
      const pedidoNovo: Pedido = await this.pedidoModel.create({
        usuarioId: usuario.id,
        contaId,
        ...createPedidoDto,
      });
      return pedidoNovo;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAllByContaId(contaId: string) {
    try {
      const { count, rows } = await this.pedidoModel.findAndCountAll({
        where: { contaId },
      });

      return {
        data: rows,
        totalCount: count,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getPedidosUltimas24Horas(
    estabelecimentoId: string,
    numeroMesa: number,
  ) {
    const estabeleciemnto = await this.estabelecimentoService.getById(
      estabelecimentoId,
    );
    const dataAtual = new Date();
    const data24HorasAtras = new Date(dataAtual);
    data24HorasAtras.setHours(data24HorasAtras.getHours() - 24);

    const whereConditions: any = {
      estabeleciemnto,
      dataCriacao: LessThan(dataAtual),
      novaDataCriacao: MoreThan(data24HorasAtras),
    };

    if (numeroMesa) {
      whereConditions.numeroMesa = Like(`%${numeroMesa}%`);
    }

    return this.pedidoModel.findOne({
      where: whereConditions,
    });
  }

  async findAll() {
    try {
      const { count, rows } = await this.pedidoModel.findAndCountAll();

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

  async findById(
    pedidoId: string,
    { include }: { include?: Includeable | Includeable[] } = {},
  ): Promise<Pedido> {
    const pedido = await this.pedidoModel.findOne({
      where: {
        id: pedidoId,
      },
      include,
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
  async createPedidoAndConta(
    usuarioId: string,
    { ...createPedidoDto }: CreatePedidoDto,
    { ...createContaDto }: CreateContaDto,
    mesaId: string,
  ): Promise<[Pedido, Conta]> {
    const usuario = await this.usuarioService.findById(usuarioId);
    const mesa = await this.mesaService.getById(mesaId);
    if (!usuario) {
      throw new NotFoundError('Usuario não encontrado');
    }
    if (!mesa) {
      throw new NotFoundError('Mesa não encontrada');
    }
    try {
      const pedidoNovo: Pedido = await this.pedidoModel.create({
        usuarioId,
        ...createPedidoDto,
      });
      if (!pedidoNovo) {
        throw new BadRequestException('Não foi possivel criar o pedido');
      }

      const contaNova: Conta = await this.contaService.create(
        createContaDto,
        mesa.id,
      );
      if (!contaNova) {
        throw new BadRequestException('Não foi possivel criar a conta');
      }

      const result: Promise<[Pedido, Conta]> = Promise.all([
        pedidoNovo,
        contaNova,
      ]);
      return result;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async findContaWithMesa(
    mesaId: string,
    createContaDto: CreateContaDto,
    usuarioId: string,
    createPedidoDto: CreatePedidoDto,
  ): Promise<Pedido> {
    try {
      const contaAberta: Conta = await this.contaService.findOneByMesa(mesaId);

      if (!contaAberta) {
        const contaCriada: Promise<Conta> = this.contaService.create(
          createContaDto,
          mesaId,
        );
        this.create(usuarioId, (await contaCriada).id, createPedidoDto);
      }
      const pedidoCriado: Pedido = await this.create(
        usuarioId,
        (
          await contaAberta
        ).id,
        createPedidoDto,
      );

      return pedidoCriado;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
