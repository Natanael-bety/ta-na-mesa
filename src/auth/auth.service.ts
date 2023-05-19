import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import { UsuarioPayload } from './models/UsuarioPayload';
import { compare } from 'bcrypt';
import { UnauthorizedError } from 'src/error/unauthorized.error';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(usuario: Usuario) {
    const payload: UsuarioPayload = {
      sub: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUsuario(
    username: string,
    senha: string,
    email: string,
  ): Promise<Usuario | null> {
    const user = await this.usuarioService.findByEmail(email);

    if (user) {
      const isPasswordCorrectly = await compare(senha, user.senha);

      if (isPasswordCorrectly) {
        return {
          ...user,
          senha: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'O endereço de e-mail ou a senha fornecidos estão incorretos.',
    );
  }

  async generateToken(usuario: Usuario): Promise<string> {
    const payload = {
      sub: usuario.id,
      email: usuario.email,
    };
    return this.jwtService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<{ id: string; email: string }> {
    const payload = await this.jwtService.verifyAsync(token);
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
