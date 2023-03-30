import { Module } from '@nestjs/common';
import { ClienteModule } from './modules/cliente/cliente.module';
import { ColaboradorModule } from './modules/colaborador/colaborador.module';
import { EstabelecimentoModule } from './modules/estabelecimento/estabelecimento.module';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { MesaModule } from './modules/mesa/mesa.module';
import { ContaModule } from './modules/conta/conta.module';
import { PedidoModule } from './modules/pedido/pedido.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './models/usuario.model';
import { Colaborador } from './models/colaborador.model';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { PedidoProdutoModule } from './modules/pedido-produto/pedido-produto.module';
import { IngredienteProdutoModule } from './modules/ingrediente-produto/ingrediente-produto.module';
import { IngredienteModule } from './modules/ingrediente/ingrediente.module';
import { Cliente } from './models/cliente.model';
import { Categoria } from './models/categoria.model';
import { CategoriasModule } from './modules/categorias/categorias.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: 'server',
      password: process.env.DATABASE_PASSWORD,
      database: 'ta-na-mesa-dev',
      autoLoadModels: true,
      synchronize: true,
      models: [Usuario, Colaborador, Cliente],
    }),
    UsuarioModule,
    PedidoProdutoModule,
    IngredienteProdutoModule,
    IngredienteModule,
    ClienteModule,
    // CategoriasModule,
    // ColaboradorModule,
    // EstabelecimentoModule,
    // ProdutosModule,
    // MesaModule,
    // ContaModule,
    // PedidoModule,
    // UsuarioModule,
  ],
})
export class AppModule {}
