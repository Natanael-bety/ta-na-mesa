import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MesaModule } from '../mesa/mesa.module';
import { Chamada } from 'src/models/chamada.model';
import { CreateChamadaDto } from './dto/create-chamada.dto';

@Injectable()
export class ChamadaService {
  constructor(
    @InjectModel(Chamada) private readonly ChamadaModel: typeof Chamada,
    private readonly mesaModule: MesaModule,
  ) {}

  async create({ chamadaResolvida, chamada }: CreateChamadaDto) {
    try {
      const chamadaCreate = await this.ChamadaModel.create(chamadaResolvida);

      return chamadaCreate;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
