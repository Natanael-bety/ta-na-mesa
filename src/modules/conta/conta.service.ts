import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Conta } from 'src/models/conta.model';
import { MesaService } from '../mesa/mesa.service';

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

  findAll() {
    return `This action returns all conta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conta`;
  }

  update(id: number, updateContaDto: UpdateContaDto) {
    return `This action updates a #${id} conta`;
  }

  remove(id: number) {
    return `This action removes a #${id} conta`;
  }
}
