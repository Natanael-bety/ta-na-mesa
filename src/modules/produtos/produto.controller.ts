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
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { TotalCountInterceptor } from 'src/config/interceptors/total-count.interceptor';
import { GetProdutosPorEstabelecimento } from './dto/get-produtos-por-estabelecimento.dto';
import { Produto } from 'src/models/produto.model';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post('/categoria/:categoriaId')
  @FormDataRequest()
  create(
    @Body() createProdutoDto: CreateProdutoDto,
    @Param('categoriaId') categoriaId: string,
  ) {
    return this.produtoService.create(createProdutoDto, categoriaId);
  }

  @Get('/estabelecimento/:estabelecimentoId')
  @UseInterceptors(TotalCountInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  getProdutosPorCategoriaId(
    @Param('estabelecimentoId') estabelecimentoId: string,
    @Query() getProdutosPorEstabelecimentoDto: GetProdutosPorEstabelecimento,
  ) {
    return this.produtoService.getProdutorPorEstabelecimento(
      estabelecimentoId,
      getProdutosPorEstabelecimentoDto,
    );
  }

  @Get(':produtoId')
  findOne(@Param('produtoId') produtoId: string): Promise<Produto> {
    return this.produtoService.getById(produtoId);
  }

  @Put(':produtoId')
  update(
    @Param('produtoId') produtoId: string,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ) {
    return this.produtoService.update(produtoId, updateProdutoDto);
  }

  @Delete(':produtoId')
  remove(@Param('produtoId') produtoId: string): void {
    return this.produtoService.remove(produtoId);
  }
}
