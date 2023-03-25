import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProdutosModule } from './produtos/produtos.module';
import { MesaModule } from './mesa/mesa.module';
import { ContaModule } from './conta/conta.module';
import { PedidoModule } from './pedido/pedido.module';
import { UsuarioModule } from './usuario/usuario.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './models/usuario.model';
import { Colaborador } from './models/colaborador.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'server',
      password: 'pj2*ML8r76*8',
      database: 'ta-na-mesa-dev',
      autoLoadModels: true,
      synchronize: true,
      models: [Usuario, Colaborador],
    }),
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
