import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioService } from 'src/modules/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, senha: string, email: string) {
    const user = await Usuario.findOne({ where: { username, senha, email } });
    if (!user) {
      throw new Error('Credenciais invalidas');
    }
    const payload = { username };
    return this.jwtService.sign(payload);
  }

  async validateUsuario(
    username: string,
    senha: string,
    email: string,
  ): Promise<Usuario | null> {
    const usuario = await this.usuarioService.findOneByEmail(username);

    if (usuario && usuario.email === email) {
      return usuario;
    }

    return null;
  }

  async generateToken(usuario: Usuario): Promise<string> {
    const payload = {
      username: usuario.username,
      sub: usuario.id,
      email: usuario.email,
    };
    return this.jwtService.signAsync(payload);
  }

  async verifyToken(
    token: string,
  ): Promise<{ username: string; id: string; email: string }> {
    const payload = await this.jwtService.verifyAsync(token);
    return {
      username: payload.username,
      id: payload.sub,
      email: payload.email,
    };
  }
}
