import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { Mesa } from 'src/models/mesa.model';
import { InjectModel } from '@nestjs/sequelize';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';

@Injectable()
export class MesaService {
  constructor(
    @InjectModel(Mesa) private MesaModule: typeof Mesa,
    private readonly estabelecimentoService: EstabelecimentoService,
  ) {}

  async create({ numero, status }: CreateMesaDto, estabelecimentoId: string) {
    const estabelecimento = await this.estabelecimentoService.getById(
      estabelecimentoId,
    );

    try {
      const novaMesa = await this.MesaModule.create({
        estabelecimentoId: estabelecimento.id,
        numero,
        status,
      });

      const mesaCriada = await this.MesaModule.create(novaMesa);

      return mesaCriada.toJSON;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAllByEstabelecimentoId(estabelecimentoId: string) {
    try {
      const { count, rows } = await this.MesaModule.findAndCountAll({
        where: { estabelecimentoId },
      });

      return {
        data: rows,
        totalCount: count,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  findAll() {
    return `This action returns all mesa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mesa`;
  }

  update(id: number, updateMesaDto: UpdateMesaDto) {
    return `This action updates a #${id} mesa`;
  }

  remove(id: number) {
    return `This action removes a #${id} mesa`;
  }
}
