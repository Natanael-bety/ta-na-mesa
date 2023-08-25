import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ChamadaService } from './chamada.service';
import { CreateChamadaDto } from './dto/create-chamada.dto';
import { UpdateChamadaDto } from './dto/update-chamada.dto';

@Controller('chamadas')
export class ChamadaController {
  constructor(private readonly chamadaService: ChamadaService) {}

  @Post('/mesa/:mesaId')
  create(
    @Param('mesaId') mesaId: string,
    @Body() createChamadaDto: CreateChamadaDto,
  ) {
    return this.chamadaService.create(createChamadaDto, mesaId);
  }

  @Put(':chamadaId')
  update(
    @Param('chamadaId') chamadaId: string,
    @Body() updateChamadaDto: UpdateChamadaDto,
  ) {
    return this.chamadaService.update(chamadaId, updateChamadaDto);
  }
}
