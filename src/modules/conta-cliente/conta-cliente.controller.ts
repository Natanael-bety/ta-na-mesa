import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContaClienteService } from './conta-cliente.service';
import { UpdateContaClienteDto } from './dto/update-conta-cliente.dto';
import { ContaCliente } from 'src/models/conta-cliente.model';
import { TotalCountInterceptor } from 'src/config/interceptors/total-count.interceptor';

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

  @Get('/usuario/:usuarioId')
  @UseInterceptors(TotalCountInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  findAllByMesa(@Param('usuarioId') usuarioId: string) {
    return this.contaClienteService.findAll(usuarioId);
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
