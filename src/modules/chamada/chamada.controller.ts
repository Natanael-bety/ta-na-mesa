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

  @Get()
  findAll(): Promise<Chamada[]> {
    return this.chamadaService.findAll();
  }

  @Get(':chamadaId')
  findOne(@Param('chamadaId') chamadaId: string): Promise<Chamada> {
    return this.chamadaService.findOne(chamadaId);
  }

  @Put(':chamadaId')
  update(
    @Param('chamadaId') chamadaId: string,
    creatChamadaDto: CreateChamadaDto,
  ): Promise<Chamada> {
    return this.chamadaService.update(creatChamadaDto, chamadaId);
  }

  @Delete('chamadaId')
  delete(@Param('chamadaId') chamadaId: string): Promise<void> {
    return this.chamadaService.remove(chamadaId);
  }
}
