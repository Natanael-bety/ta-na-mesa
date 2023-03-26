import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get(':id')
  async getUsuario(@Param('id') usuarioId: string) {
    const user = this.usuarioService.getUsuarioById(usuarioId);

    return user;
  }

  @Post()
  async createUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    const user = this.usuarioService.createUsuario(createUsuarioDto);

    return user;
  }
}
