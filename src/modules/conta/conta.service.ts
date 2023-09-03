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
import { Mesa } from 'src/models/mesa.model';

@Injectable()
export class ContaService {
  constructor(
    @InjectModel(Conta) private readonly contaModel: typeof Conta,
    private readonly mesaService: MesaService,
  ) {}
  async create({ valorTotal }: CreateContaDto, mesaId: string): Promise<Conta> {
    const mesa = await this.mesaService.getById(mesaId);

    try {
      const conta: Conta = await this.contaModel.create({
        mesaId: mesa.id,
        valorTotal,
      });

      return conta.toJSON();
    } catch (err) {
      throw new BadRequestException(new Error(err).message);
    }
  }

  findAll(): Promise<Conta[]> {
    try {
      return this.contaModel.findAll({
        include: {
          model: Mesa,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(contaId: string): Promise<Conta> {
    const conta = await this.contaModel.findOne({
      where: { id: contaId },
    });

    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }

    return conta;
  }

  async update(
    contaId: string,
    updateContaDto: UpdateContaDto,
  ): Promise<Conta> {
    try {
      const conta: Conta = await this.contaModel.findByPk(contaId, {
        rejectOnEmpty: true,
      });
      const novaCategoria: Conta = await conta.update({
        ...updateContaDto,
      });

      return novaCategoria;
    } catch (err) {
      throw new BadRequestException(new Error(err).message);
    }
  }

  remove(contaId: string): void {
    this.contaModel.destroy({ where: { id: contaId } });
  }
}
