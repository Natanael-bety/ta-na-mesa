import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from 'src/models/usuario.model';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
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

  async createUsuario({ email, nome, senha }: CreateUsuarioDto) {
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
}
