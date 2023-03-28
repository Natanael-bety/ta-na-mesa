import { Module } from '@nestjs/common';
import { IngredienteProdutoService } from './ingrediente-produto.service';
import { IngredienteProdutoController } from './ingrediente-produto.controller';

@Module({
  controllers: [IngredienteProdutoController],
  providers: [IngredienteProdutoService],
})
export class IngredienteProdutoModule {}
