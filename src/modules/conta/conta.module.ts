import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { ContaController } from './conta.controller';

@Module({
  controllers: [ContaController],
  providers: [ContaService],
})
export class ContaModule {}
