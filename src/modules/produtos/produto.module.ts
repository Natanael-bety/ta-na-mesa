import { Module } from '@nestjs/common';
import { ProdutosService } from './produto.service';
import { ProdutosController } from './produto.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Mesa } from 'src/models/mesa.model';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosService],
  imports: [SequelizeModule.forFeature([Mesa])],
})
export class ProdutosModule {}
