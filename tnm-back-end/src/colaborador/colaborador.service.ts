import { Injectable } from '@nestjs/common';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';

@Injectable()
export class ColaboradorService {
  create(createColaboradorDto: CreateColaboradorDto) {
    return 'This action adds a new colaborador';
  }

  findAll() {
    return `This action returns all colaborador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} colaborador`;
  }

  update(id: number, updateColaboradorDto: UpdateColaboradorDto) {
    return `This action updates a #${id} colaborador`;
  }

  remove(id: number) {
    return `This action removes a #${id} colaborador`;
  }
}
