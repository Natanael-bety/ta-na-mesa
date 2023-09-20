import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Conta } from 'src/models/conta.model';
import { MesaService } from '../mesa/mesa.service';
import { NotFoundError } from 'src/common/error/types/notFound.error';

@Injectable()
export class ContaService {
  constructor(
    @InjectModel(Conta) private readonly contaModel: typeof Conta,
    private readonly mesaService: MesaService,
  ) {}
  async create(
    { valorTotal, aberta }: CreateContaDto,
    mesaId: string,
  ): Promise<Conta> {
    const mesa = await this.mesaService.getById(mesaId);

    try {
      const conta: Conta = await this.contaModel.create({
        mesaId: mesa.id,
        valorTotal,
        aberta,
      });

      return conta.toJSON();
    } catch (err) {
      throw new BadRequestException(new Error(err).message);
    }
  }

  async findAllByMesa(mesaId: string) {
    try {
      const { count, rows } = await this.contaModel.findAndCountAll({
        where: { mesaId },
      });

      return {
        data: rows,
        totalCount: count,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(contaId: string): Promise<Conta> {
    const conta = await this.contaModel.findOne({
      where: { id: contaId },
    });

    if (!conta) {
      throw new NotFoundError('Conta não encontrada');
    }

    return conta;
  }

  async update(
    contaId: string,
    updateContaDto: UpdateContaDto,
  ): Promise<Conta> {
    try {
      const conta = await this.findOne(contaId);

      const { ...updateContadete } = updateContaDto;

      const novaConta: Conta = await conta.update({
        ...updateContadete,
      });

      return novaConta;
    } catch (err) {
      throw new BadRequestException(new Error(err).message);
    }
  }

  async remove(contaId: string): Promise<void> {
    try {
      const contaExist: Conta = await this.contaModel.findByPk(contaId);

      if (!contaExist) {
        throw new NotFoundError('Conta não encontrada');
      }

      await this.contaModel.destroy({ where: { id: contaId } });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async restaure(contaId: string): Promise<void> {
    try {
      const contaExist: Conta = await this.contaModel.findByPk(contaId);

      if (!contaExist) {
        throw new NotFoundError('Conta não encontrada');
      }

      await this.contaModel.restore({ where: { id: contaId } });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
