import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContaService } from './conta.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { Conta } from 'src/models/conta.model';

@Controller('contas')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Post('/mesa/:mesaId')
  create(
    @Param('mesaId') mesaId: string,
    @Body() createContaDto: CreateContaDto,
  ): Promise<Conta> {
    return this.contaService.create(createContaDto, mesaId);
  }

  @Get()
  findAll() {
    return this.contaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContaDto: UpdateContaDto) {
    return this.contaService.update(+id, updateContaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contaService.remove(+id);
  }
}
