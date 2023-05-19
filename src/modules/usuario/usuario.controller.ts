import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { AuthService } from 'src/auth/auth.service';
import { UsuarioService } from './usuario.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('usuario/auth')
export class UsuarioController {
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
  ) {}

  @Get(':id')
  async getUsuario(@Param('id') usuarioId: string) {
    const user = this.usuarioService.getUsuarioById(usuarioId);

    return user;
  }

  @IsPublic()
  @Post('login')
  async createUsuario(
    @Body() body: { username: string; email: string; senha: string },
    createUsuarioDto: CreateUsuarioDto,
  ): Promise<{ token: string }> {
    const user = this.usuarioService.createUsuario(createUsuarioDto);
    const authUsuario = await this.authService.validateUsuario(
      body.username,
      body.email,
      body.senha,
    );

    if (!authUsuario) {
      throw new Error('Usuario ou senha invalido.');
    }

    const token = await this.usuarioService.generateToken(authUsuario);

    return { token };
  }
}
