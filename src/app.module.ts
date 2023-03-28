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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: 'server',
      password: 'pj2*ML8r76*8',
      database: 'ta-na-mesa-dev',
      autoLoadModels: true,
      synchronize: true,
      models: [Usuario, Colaborador],
    }),
    UsuarioModule,
    PedidoProdutoModule,
    IngredienteProdutoModule,
    IngredienteModule,
    // ClienteModule,
    // ColaboradorModule,
    // EstabelecimentoModule,
    // CategoriasModule,
    // ProdutosModule,
    // MesaModule,
    // ContaModule,
    // PedidoModule,
    // UsuarioModule,
  ],
})
export class AppModule {}
