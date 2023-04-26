import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Usuario } from 'src/models/usuario.model';
import { AuthRequest } from '../models/AuthRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Usuario => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.usuario;
  },
);
