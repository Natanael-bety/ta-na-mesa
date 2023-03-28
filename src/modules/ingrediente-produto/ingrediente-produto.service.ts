import { Injectable } from '@nestjs/common';
import { CreateIngredienteProdutoDto } from '../../ingrediente-produto/dto/create-ingrediente-produto.dto';
import { UpdateIngredienteProdutoDto } from '../../ingrediente-produto/dto/update-ingrediente-produto.dto';

@Injectable()
export class IngredienteProdutoService {
  create(createIngredienteProdutoDto: CreateIngredienteProdutoDto) {
    return 'This action adds a new ingredienteProduto';
  }

  findAll() {
    return `This action returns all ingredienteProduto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredienteProduto`;
  }

  update(id: number, updateIngredienteProdutoDto: UpdateIngredienteProdutoDto) {
    return `This action updates a #${id} ingredienteProduto`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredienteProduto`;
  }
}
