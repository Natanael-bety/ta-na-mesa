import { Module } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorController } from './colaborador.controller';

@Module({
  controllers: [ColaboradorController],
  providers: [ColaboradorService],
})
export class ColaboradorModule {}
