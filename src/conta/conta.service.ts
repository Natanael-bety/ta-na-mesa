import { Injectable } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';

@Injectable()
export class ContaService {
  create(createContaDto: CreateContaDto) {
    return 'This action adds a new conta';
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
