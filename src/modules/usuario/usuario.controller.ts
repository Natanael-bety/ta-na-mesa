import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { AuthService } from 'src/auth/auth.service';
import { UsuarioService } from './usuario.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get(':id')
  async getUsuario(@Param('id') usuarioId: string) {
    const user = this.usuarioService.getUsuarioById(usuarioId);

    return user;
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @IsPublic()
  @Post('/')
  async createUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    const user = this.usuarioService.createUsuario(createUsuarioDto);

    return { user };
  }

  @Put('/')
  async updateUsuario(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.usuarioUpdate(id, updateUsuarioDto);
  }
}
