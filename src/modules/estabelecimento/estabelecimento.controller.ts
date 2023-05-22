import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';
import { TiposGuard } from 'src/config/guards/tipos.guard';
import { Tipos } from 'src/config/decorators/tipos.decorator';
import { USUARIO_TIPO } from 'src/constants/usuario';

@Controller('estabelecimentos')
@UseGuards(TiposGuard)
@UseGuards(JwtAuthGuard)
export class EstabelecimentoController {
  constructor(
    private readonly estabelecimentoService: EstabelecimentoService,
  ) {}

  @Post('/')
  @FormDataRequest()
  create(@Body() createEstabelecimentoDto: CreateEstabelecimentoDto) {
    return this.estabelecimentoService.create(createEstabelecimentoDto);
  }

  @Get()
  findAll() {
    return this.estabelecimentoService.findAll();
  }

  @Get(':estabelecimentoId')
  @Tipos(USUARIO_TIPO.ADMIN)
  findOne(@Param('estabelecimentoId') estabelecimentoId: string) {
    return this.estabelecimentoService.getById(estabelecimentoId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstabelecimentoDto: UpdateEstabelecimentoDto,
  ) {
    return this.estabelecimentoService.update(+id, updateEstabelecimentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estabelecimentoService.remove(+id);
  }
}
