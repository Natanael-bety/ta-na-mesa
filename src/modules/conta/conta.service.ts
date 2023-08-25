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
  async create(
    { valorTotal, finalizadoEm }: CreateContaDto,
    mesaId: string,
  ): Promise<Conta> {
    const mesa = await this.mesaService.getById(mesaId);

    try {
      const conta: Conta = await this.contaModel.create({
        mesaId: mesa.id,
        valorTotal,
        finalizadoEm,
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
      throw new NotFoundException('Categoria não encontrada');
    }

    return conta;
  }

  update(id: number, updateContaDto: UpdateContaDto) {
    return `This action updates a #${id} conta`;
  }

  remove(id: number) {
    return `This action removes a #${id} conta`;
  }
}
