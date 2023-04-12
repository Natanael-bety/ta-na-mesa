import { Module } from '@nestjs/common';
import { ProdutosService } from './produto.service';
import { ProdutosController } from './produto.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Produto } from 'src/models/produto.model';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosService],
  imports: [SequelizeModule.forFeature([Produto])],
})
export class ProdutosModule {}
