import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ChamadaService } from './chamada.service';
import { CreateChamadaDto } from './dto/create-chamada.dto';
import { Chamada } from 'src/models/chamada.model';

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

  @Get()
  findAll(): Promise<Chamada[]> {
    return this.chamadaService.findAll();
  }

  @Delete('/chamadaId')
  remove(@Param('chamadaId') chamadaId: string): Promise<void> {
    return this.chamadaService.remove(chamadaId);
  }
}
