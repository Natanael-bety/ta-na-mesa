import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from 'src/models/usuario.model';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { USUARIO_TIPO } from 'src/constants/usuario';
import { CreateUsuarioDto } from '../auth/dto/create-usuario.dto';

@Injectable()
export class UsuarioService {
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

  async createUsuario(
    {
      nome,
      email,
      senha,
      tipo,
    }: {
      email: string;
      nome: string;
      senha: string;
      tipo: USUARIO_TIPO;
    },
    estabelecimentoId?: string,
  ) {
    try {
      const userExists = await this.usuarioModel.findOne({ where: { email } });

      if (userExists) {
        throw new Error('Usuario já existe.');
      }

      const newUsuario = await this.usuarioModel.create({
        email,
        senha,
        nome,
        tipo,
        estabelecimentoId: estabelecimentoId,
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

  findAll(): Promise<Usuario[]> {
    try {
      return this.usuarioModel.findAll({
        attributes: ['id', 'senha', 'nome', 'email'],
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findById(usuarioId: string): Promise<Usuario> {
    const usuario: Usuario = await this.usuarioModel.findOne({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new Error('Usuario não encontrado');
    }

    return usuario;
  }

  async update(
    usuarioId: string,
    { nome, email, senha, tipo }: UpdateUsuarioDto,
  ) {
    try {
      const usuario = await this.findById(usuarioId);

      const updatedUsuario = usuario.update({ nome, email, senha, tipo });

      return updatedUsuario;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async remove(usuarioId: string) {
    await this.usuarioModel.destroy({ where: { id: usuarioId } });
  }
}
