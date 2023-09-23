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
import { TotalCountInterceptor } from 'src/config/interceptors/total-count.interceptor';

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

  @Get('/')
  @UseInterceptors(TotalCountInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  getProdutosPorCategoriaId() {
    return this.estabelecimentoService.findAll();
  }

  @Get(':estabelecimentoId')
  @Tipos(USUARIO_TIPO.ADMIN)
  findOne(@Param('estabelecimentoId') estabelecimentoId: string) {
    return this.estabelecimentoService.getById(estabelecimentoId);
  }

  @Put(':estabelecimentoId')
  update(
    @Param('estabelecimentoId') estabelecimentoId: string,
    @Body() updateEstabelecimentoDto: UpdateEstabelecimentoDto,
  ) {
    return this.estabelecimentoService.update(
      estabelecimentoId,
      updateEstabelecimentoDto,
    );
  }

  @Delete(':estabelecimentoId')
  remove(
    @Param('proestabelecimentoIddutoId') estabelecimentoId: string,
  ): Promise<void> {
    return this.estabelecimentoService.remove(estabelecimentoId);
  }

  @Put('estabelecimento/:estabelecimentoId')
  restaure(
    @Param('proestabelecimentoIddutoId') estabelecimentoId: string,
  ): Promise<void> {
    return this.estabelecimentoService.restaure(estabelecimentoId);
  }
}
