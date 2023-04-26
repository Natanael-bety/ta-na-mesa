import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from 'src/models/usuario.model';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
  imports: [SequelizeModule.forFeature([Usuario])],
})
export class UsuarioModule {}
