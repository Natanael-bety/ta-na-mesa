import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import { compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { IsEmail } from 'class-validator';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private estabelecimentoService: EstabelecimentoService,
  ) {}

  async validateTokenData({ email }: { email: string; username: string }) {
    return await this.usuarioService.findByEmail(email);
  }

  async login({ email, senha }: LoginDto) {
    try {
      const user = await this.usuarioService.findByEmail(email);

      if (!user) {
        throw new BadRequestException('Email ou senha inválidos.');
      }

      const isPasswordCorrectly = await compare(senha, user.senha);

      if (!isPasswordCorrectly) {
        throw new BadRequestException('Email ou senha inválidos.');
      }

      const token = await this.generateToken({
        email: user.email,
        senha: user.senha,
      });

      return { usuario: this.normalizeUsuario(user), token };
    } catch (err) {
      throw err;
    }
  }

  async generateToken(payload: { email: string; senha?: string }) {
    return this.jwtService.sign(payload);
  }

  private normalizeUsuario(usuario: Usuario): Usuario {
    delete usuario.senha;

    return usuario.toJSON();
  }

  async createUsuario(createUsuarioDto: CreateUsuarioDto) {
    const createdUser: Usuario = await this.usuarioService.createUsuario(
      createUsuarioDto,
    );

    const token: string = await this.generateToken({
      email: createdUser.email,
      senha: createdUser.senha,
    });

    return {
      usuario: this.normalizeUsuario(createdUser),
      token: token,
    };
  }

  async getUsuarioPorEmail(email: string): Promise<Usuario> {
    try {
      const usuario = await this.usuarioService.findByEmail(email);

      if (!usuario) {
        throw new Error('Usuario não encontrado');
      }

      return usuario;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
