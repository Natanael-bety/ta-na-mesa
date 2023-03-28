import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredienteProdutoDto } from './create-ingrediente-produto.dto';

export class UpdateIngredienteProdutoDto extends PartialType(
  CreateIngredienteProdutoDto,
) {}
