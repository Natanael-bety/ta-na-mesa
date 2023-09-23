import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Query,
  Put,
} from '@nestjs/common';
import { ChamadaService } from './chamada.service';
import { CreateChamadaDto } from './dto/create-chamada.dto';
import { Chamada } from 'src/models/chamada.model';
import { PaginationDto } from '../common/validators/pagination.dto';
import { TotalCountInterceptor } from 'src/config/interceptors/total-count.interceptor';

@Controller('chamadas')
export class ChamadaController {
  constructor(private readonly chamadaService: ChamadaService) {}

  @Post('/mesa/:mesaId')
  create(
    @Param('mesaId') mesaId: string,
    @Body() createChamadaDto: CreateChamadaDto,
  ): Promise<Chamada> {
    return this.chamadaService.create(createChamadaDto, mesaId);
  }

  @Put('/mesa/:mesaId')
  update(
    @Param('mesaId') mesaId: string,
    @Body() createChamadaDto: CreateChamadaDto,
  ): Promise<Chamada> {
    return this.chamadaService.update(createChamadaDto, mesaId);
  }

  @Get('/chamadaId')
  findOne(@Param('chamadaId') chamadaId: string): Promise<Chamada> {
    return this.chamadaService.findOne(chamadaId);
  }

  @Get('/mesa/:mesaId')
  @UseInterceptors(TotalCountInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  findAllByMesaId(
    @Param('mesaId') mesaId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.chamadaService.findAll(mesaId, pagination);
  }

  @Delete('/chamadaId')
  remove(@Param('chamadaId') chamadaId: string): Promise<void> {
    return this.chamadaService.remove(chamadaId);
  }

  @Put('chamada/chamadaId')
  restaure(@Param('chamadaId') chamadaId: string): Promise<void> {
    return this.chamadaService.restaure(chamadaId);
  }
}
