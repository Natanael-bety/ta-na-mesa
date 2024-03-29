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
  Put,
  UseGuards,
} from '@nestjs/common';
import { MesaService } from './mesa.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { TotalCountInterceptor } from 'src/config/interceptors/total-count.interceptor';
import { Mesa } from 'src/models/mesa.model';
import { TiposGuard } from 'src/config/guards/tipos.guard';
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';

@Controller('mesas')
@UseGuards(TiposGuard)
@UseGuards(JwtAuthGuard)
export class MesaController {
  constructor(private readonly mesaService: MesaService) {}

  @Post('/estabelecimento/:estabelecimentoId')
  create(
    @Param('estabelecimentoId') estabelecimentoId: string,
    @Body() createMesaDto: CreateMesaDto,
  ): Promise<Mesa> {
    return this.mesaService.create(createMesaDto, estabelecimentoId);
  }

  @Get('/estabelecimento/:estabelecimentoId')
  @UseInterceptors(TotalCountInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  findAllByEstabelecimentoId(
    @Param('estabelecimentoId') EstabelecimentoId: string,
  ) {
    return this.mesaService.findAllByEstabelecimentoId(EstabelecimentoId);
  }

  @Put('/estabelecimento/:mesaId')
  update(
    @Param('mesaId') mesaId: string,
    @Body() updateMesaDto: UpdateMesaDto,
  ): Promise<Mesa> {
    return this.mesaService.update(mesaId, updateMesaDto);
  }

  @Delete('/estabelecimento/:mesaId')
  remove(@Param('mesaId') mesaId: string): Promise<void> {
    return this.mesaService.remove(mesaId);
  }

  @Put('/estabelecimento/mesa/:mesaId')
  restaure(@Param('mesaId') mesaId: string): Promise<void> {
    return this.mesaService.restaure(mesaId);
  }
}
