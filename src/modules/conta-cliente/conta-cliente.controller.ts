import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContaClienteService } from './conta-cliente.service';
import { UpdateContaClienteDto } from './dto/update-conta-cliente.dto';
import { ContaCliente } from 'src/models/conta-cliente.model';

@Controller('conta-cliente')
export class ContaClienteController {
  constructor(private readonly contaClienteService: ContaClienteService) {}

  @Post('/:contaId/:usuarioId')
  create(
    @Param('contaId') @Param('usuarioId') contaId: string,
    usuarioId: string,
  ): Promise<ContaCliente> {
    return this.contaClienteService.create(contaId, usuarioId);
  }

  @Get()
  findAll(): Promise<ContaCliente[]> {
    return this.contaClienteService.findAll();
  }

  @Get(':contaClienteId')
  findOne(
    @Param('contaClienteId') contaClienteId: string,
  ): Promise<ContaCliente> {
    return this.contaClienteService.findOne(contaClienteId);
  }

  @Delete(':contaClienteId')
  remove(@Param('contaClienteId') contaClienteId: string) {
    return this.contaClienteService.remove(contaClienteId);
  }
}
