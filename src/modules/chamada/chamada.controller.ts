import { Body, Controller, Param, Post } from '@nestjs/common';
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
}
