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
  findAll(): Promise<Conta[]> {
    return this.contaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Conta> {
    return this.contaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContaDto: UpdateContaDto,
  ): Promise<Conta> {
    return this.contaService.update(id, updateContaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.contaService.remove(id);
  }
}
