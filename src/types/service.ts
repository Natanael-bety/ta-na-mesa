import { Request } from 'express';
import { Usuario } from 'src/models/usuario.model';

export type RequestWithUser = Request & { user: Usuario };
