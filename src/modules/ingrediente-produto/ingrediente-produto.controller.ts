import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IngredienteProdutoService } from './ingrediente-produto.service';
import { CreateIngredienteProdutoDto } from './dto/create-ingrediente-produto.dto';
import { UpdateIngredienteProdutoDto } from './dto/update-ingrediente-produto.dto';

@Controller('ingrediente-produto')
export class IngredienteProdutoController {
  constructor(
    private readonly ingredienteProdutoService: IngredienteProdutoService,
  ) {}

  @Post()
  create(@Body() createIngredienteProdutoDto: CreateIngredienteProdutoDto) {
    return this.ingredienteProdutoService.create(createIngredienteProdutoDto);
  }

  @Get()
  findAll() {
    return this.ingredienteProdutoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredienteProdutoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredienteProdutoDto: UpdateIngredienteProdutoDto,
  ) {
    return this.ingredienteProdutoService.update(
      +id,
      updateIngredienteProdutoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredienteProdutoService.remove(+id);
  }
}
