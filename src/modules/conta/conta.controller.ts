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
import { ContaService } from './conta.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { Conta } from 'src/models/conta.model';
import { TotalCountInterceptor } from 'src/config/interceptors/total-count.interceptor';
import { CreatePedidoDto } from '../pedido/dto/create-pedido.dto';
import { Pedido } from 'src/models/pedido.model';

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

  @Get('/mesa/:mesaId')
  @UseInterceptors(TotalCountInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  findAllByMesa(@Param('mesaId') MesaId: string) {
    return this.contaService.findAllByMesa(MesaId);
  }

  @Get('/mesa/:contaId')
  findOne(@Param('contaId') contaId: string): Promise<Conta> {
    return this.contaService.findOne(contaId);
  }

  @Put('/mesa/:mesaId')
  update(
    @Param('mesaId') mesaId: string,
    @Body() updateContaDto: UpdateContaDto,
  ): Promise<Conta> {
    return this.contaService.update(mesaId, updateContaDto);
  }

  @Delete('/mesa/:contaId')
  remove(@Param('contaId') contaId: string): Promise<void> {
    return this.contaService.remove(contaId);
  }

  @Put('/conta/:contaId')
  restaure(@Param('contaId') contaId: string): Promise<void> {
    return this.contaService.restaure(contaId);
  }
}
