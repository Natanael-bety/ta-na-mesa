import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chamada } from 'src/models/chamada.model';
import { CreateChamadaDto } from './dto/create-chamada.dto';
import { MesaService } from '../mesa/mesa.service';
import { UpdateChamadaDto } from './dto/update-chamada.dto';

@Injectable()
export class ChamadaService {
  constructor(
    @InjectModel(Chamada) private readonly ChamadaModel: typeof Chamada,
    private readonly mesaService: MesaService,
  ) {}

  async create(
    { chamadaResolvida, chamada }: CreateChamadaDto,
    mesaId: string,
  ) {
    const mesa = await this.mesaService.getById(mesaId);
    try {
      const chamadaCreate = await this.ChamadaModel.create({
        mesaId: mesa.id,
        chamadaResolvida,
        chamada,
      });

      return chamadaCreate;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findById(chamadaId: string): Promise<Chamada> {
    const chamada: Chamada = await this.ChamadaModel.findOne({
      where: { id: chamadaId },
    });
    if (!chamada) {
      throw new Error('Chamada não encontrada');
    }

    return chamada;
  }

  async update(chamadaId: string, { chamadaResolvida }: UpdateChamadaDto) {
    try {
      const chamada = await this.findById(chamadaId);

      const updateChamada = chamada.update({ chamadaResolvida });

      return updateChamada;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
