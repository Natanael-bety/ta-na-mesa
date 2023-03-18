import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';

@Module({
  imports: [ClienteModule, ColaboradorModule, EstabelecimentoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
