import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from 'src/models/usuario.model';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  [x: string]: any;
  constructor(@InjectModel(Usuario) private usuarioModel: typeof Usuario) {}

  async getUsuarioById(id: string) {
    const user = await this.usuarioModel.findOne({
      where: { id },
      attributes: { exclude: ['senha'] },
    });

    if (!user) {
      throw new NotFoundException('Usuario não encontrado.');
    }

    return user;
  }

  findByEmail(email: string): Promise<Usuario> {
    return this.usuarioModel.findOne({ where: { email } });
  }

  async createUsuario({ nome, email, senha }: CreateUsuarioDto) {
    try {
      const userExists = await this.usuarioModel.findOne({ where: { email } });

      if (userExists) {
        throw new Error('Usuario já existe.');
      }

      const newUsuario = await this.usuarioModel.create({
        email,
        senha,
        nome,
      });

      if (!newUsuario) {
        throw new Error();
      }

      return newUsuario;
    } catch (err) {
      throw new BadRequestException(
        err.message || 'Erro ao criar usuário',
        err,
      );
    }
  }

  async gerarAutenticacao(email: string, senha: string) {
    const usuario = await this.usuarioModel.findOne({ where: { email } });

    if (!Usuario) {
      throw new Error('Não existe candidato com esse email');
    }

    const compararSenha = await bcrypt.compare(senha, usuario.senha);

    if (!compararSenha) {
      throw new Error('Senha incorreta');
    }

    const token = this.gerarToken;

    return { id: usuario.id, nome: usuario.nome, token };
  }

  findAll(): Promise<Usuario[]> {
    try {
      return this.usuarioModel.findAll({
        attributes: ['id', 'senha', 'nome', 'email'],
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: string): Promise<Usuario> {
    try {
      const usuarioEncontrado: Usuario = await this.usuarioModel.findOne({
        where: { id },
        attributes: { exclude: ['id', 'senha', 'nome', 'email'] },
      });

      if (!usuarioEncontrado) {
        throw new Error('Usuareio não encontrado');
      }

      return usuarioEncontrado;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async update(
    id: string,
    { nome, email, senha, tipo }: UpdateUsuarioDto,
  ): Promise<void> {
    try {
      const usuarioExiste: Usuario = await this.usuario.findById(id, {
        rejectOnEmpty: true,
      });

      if (!usuarioExiste) {
        throw new Error('Usuario não existe');
      }

      await usuarioExiste.update({ nome, email, senha, tipo });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: string) {
    try {
      const usuarioExistindo: Usuario = await this.usuarioModel.findByPk(id);

      if (!usuarioExistindo) {
        throw new Error('Usuario não existe');
      }

      await usuarioExistindo.delete({ where: { id } });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
