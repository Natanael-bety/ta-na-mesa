import { Module } from '@nestjs/common';
import { EstabelecimentoModule } from './modules/estabelecimento/estabelecimento.module';
import { MesaModule } from './modules/mesa/mesa.module';
import { ContaModule } from './modules/conta/conta.module';
import { PedidoModule } from './modules/pedido/pedido.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './models/usuario.model';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { PedidoProdutoModule } from './modules/pedido-produto/pedido-produto.module';
import { Categoria } from './models/categoria.model';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { Estabelecimento } from './models/estabelecimento.model';
import { Pedido } from './models/pedido.model';
import { Conta } from './models/conta.model';
import { PedidoProduto } from './models/pedido-produto.model';
import { Mesa } from './models/mesa.model';
import { Produto } from './models/produto.model';
import { ProdutosModule } from './modules/produtos/produto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'ta-na-mesa-dev',
      autoLoadModels: true,
      synchronize: true,
      models: [
        Usuario,
        Estabelecimento,
        Pedido,
        Categoria,
        Conta,
        Mesa,
        PedidoProduto,
        Produto,
      ],
    }),
    UsuarioModule,
    PedidoProdutoModule,
    CategoriasModule,
    EstabelecimentoModule,
    ProdutosModule,
    MesaModule,
    ContaModule,
    PedidoModule,
  ],
})
export class AppModule {}
