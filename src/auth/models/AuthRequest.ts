import { Usuario } from 'src/models/usuario.model';

export interface AuthRequest extends Request {
  usuario: Usuario;
}
