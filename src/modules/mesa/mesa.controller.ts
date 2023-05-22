import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MesaService } from './mesa.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { TotalCountInterceptor } from 'src/config/interceptors/total-count.interceptor';

@Controller('mesas')
export class MesaController {
  constructor(private readonly mesaService: MesaService) {}

  @Post('/estabelecimento/:estabelecimentoId')
  create(
    @Param('estabelecimentoId') estabelecimentoId: string,
    @Body() createMesaDto: CreateMesaDto,
  ) {
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mesaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMesaDto: UpdateMesaDto) {
    return this.mesaService.update(+id, updateMesaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mesaService.remove(+id);
  }
}
