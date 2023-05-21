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
  Query,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { TotalCountInterceptor } from 'src/config/interceptors/total-count.interceptor';
import { PaginationDto } from '../common/validators/pagination.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post('/estabelecimento/:estabelecimentoId')
  create(
    @Param('estabelecimentoId') estabelecimentoId: string,
    @Body() createCategoriaDto: CreateCategoriaDto,
  ) {
    return this.categoriasService.create(createCategoriaDto, estabelecimentoId);
  }

  @Get('/estabelecimento/:estabelecimentoId')
  @UseInterceptors(TotalCountInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  findAllByEstabelecimentoId(
    @Param('estabelecimentoId') estabelecimentoId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.categoriasService.findAllByEstabelecimentoId(
      estabelecimentoId,
      pagination,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriasService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}
