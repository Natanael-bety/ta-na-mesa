import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsuarioService } from '../usuario/usuario.service';
import { ContaService } from '../conta/conta.service';
import { ContaCliente } from 'src/models/conta-cliente.model';
@Injectable()
export class ContaClienteService {
  constructor(
    @InjectModel(ContaCliente)
    private readonly contaClienteModel: typeof ContaCliente,
    private readonly usuarioService: UsuarioService,
    private readonly contaService: ContaService,
  ) {}

  async create(usuarioId: string, contaId: string): Promise<ContaCliente> {
    const usuario = await this.usuarioService.getUsuarioById(usuarioId);
    const conta = await this.contaService.findOne(contaId);

    try {
      const contaClienteCriado: ContaCliente =
        await this.contaClienteModel.create({
          usuarioId: usuario.id,
          contaId: conta.id,
        });

      return contaClienteCriado.toJSON();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAll(usuarioId: string) {
    try {
      const { count, rows } = await this.contaClienteModel.findAndCountAll({
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

  async findOne(contaClienteId: string): Promise<ContaCliente> {
    const contaCliente = await this.contaClienteModel.findOne({
      where: {
        id: contaClienteId,
      },
    });

    if (!contaCliente) {
      throw new NotFoundException('Não encontrada');
    }

    return contaCliente;
  }

  remove(contaClienteId: string) {
    this.contaClienteModel.destroy({ where: { id: contaClienteId } });
  }
}
