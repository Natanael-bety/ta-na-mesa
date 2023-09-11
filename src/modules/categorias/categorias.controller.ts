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
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { TotalCountInterceptor } from 'src/config/interceptors/total-count.interceptor';
import { PaginationDto } from '../common/validators/pagination.dto';
import { Categoria } from 'src/models/categoria.model';
import { TiposGuard } from 'src/config/guards/tipos.guard';
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post('/estabelecimento/:estabelecimentoId')
  @UseGuards(TiposGuard)
  @UseGuards(JwtAuthGuard)
  create(
    @Param('estabelecimentoId') estabelecimentoId: string,
    @Body() createCategoriaDto: CreateCategoriaDto,
  ): Promise<Categoria> {
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

  @Get(':categoriaId')
  findOne(@Param('categoriaId') categoriaId: string): Promise<Categoria> {
    return this.categoriasService.findOne(categoriaId);
  }

  @Put(':id')
  @UseGuards(TiposGuard)
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':categoriaId')
  @UseGuards(TiposGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param('categoriaId') categoriaId: string) {
    return this.categoriasService.remove(categoriaId);
  }
}
