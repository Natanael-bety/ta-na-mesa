import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chamada } from 'src/models/chamada.model';
import { CreateChamadaDto } from './dto/create-chamada.dto';
import { MesaService } from '../mesa/mesa.service';
import { Mesa } from 'src/models/mesa.model';
import { Usuario } from 'src/models/usuario.model';
import { PaginationDto } from '../common/validators/pagination.dto';
import { NotFoundError } from 'src/common/error/types/notFound.error';

@Injectable()
export class ChamadaService {
  constructor(
    @InjectModel(Chamada) private readonly ChamadaModel: typeof Chamada,
    private readonly mesaService: MesaService,
  ) {}

  async create(
    { chamadaResolvida, chamada }: CreateChamadaDto,
    mesaId: string,
  ): Promise<Chamada> {
    const mesa = await this.mesaService.getById(mesaId);
    try {
      const chamadaCreate: Chamada = await this.ChamadaModel.create({
        mesaId: mesa.id,
        chamadaResolvida,
        chamada,
      });

      return chamadaCreate;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async update(
    creatChamadaDto: CreateChamadaDto,
    chamadaId: string,
  ): Promise<Chamada> {
    try {
      const chamada: Chamada = await this.ChamadaModel.findByPk(chamadaId, {
        include: [Mesa, Usuario],
      });
      if (!chamada) {
        throw new NotFoundError('Chamada não existente');
      }

      const novosDados: Chamada = await chamada.update(creatChamadaDto);

      return novosDados;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(chamadaId: string): Promise<Chamada> {
    try {
      const chamada: Chamada = await this.ChamadaModel.findByPk(chamadaId, {
        include: [Mesa, Usuario],
      });
      if (!chamada) {
        throw new NotFoundError('Chamada não encontrada');
      }

      return chamada;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAll(mesaId: string, { limit, offset }: PaginationDto) {
    try {
      const { count, rows } = await this.ChamadaModel.findAndCountAll({
        where: { mesaId },
        limit,
        offset,
      });

      return {
        data: rows,
        totalCount: count,
      };
    } catch (err) {
      throw new BadRequestException(new Error(err).message);
    }
  }

  async remove(chamadaId: string): Promise<void> {
    try {
      const chamadaExist: Chamada = await this.ChamadaModel.findByPk(chamadaId);

      if (!chamadaExist) {
        throw new NotFoundError('Chamada não encontrada');
      }

      await this.ChamadaModel.destroy({ where: { id: chamadaId } });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async restaure(chamadaId: string): Promise<void> {
    try {
      const chamadaExist: Chamada = await this.ChamadaModel.findByPk(chamadaId);

      if (!chamadaExist) {
        throw new NotFoundError('Chamada não encontrada');
      }

      await this.ChamadaModel.restore({ where: { id: chamadaId } });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
