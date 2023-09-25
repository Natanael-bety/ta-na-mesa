import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from 'src/models/usuario.model';

@Module({
  imports: [SequelizeModule.forFeature([Usuario])],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
