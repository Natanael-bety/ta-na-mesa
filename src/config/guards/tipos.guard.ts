import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';
import { USUARIO_TIPO } from 'src/constants/usuario';
import { TIPOS_KEYS } from '../decorators/tipos.decorator';
import { RequestWithUser } from 'src/types/service';

@Injectable()
export class TiposGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const tiposObrigatorios = this.reflector.getAllAndOverride<USUARIO_TIPO[]>(
      TIPOS_KEYS,
      [context.getHandler(), context.getClass()],
    );

    if (!tiposObrigatorios) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest() as
      | RequestWithUser
      | undefined;

    if (!user) {
      return false;
    }

    return tiposObrigatorios.some((tipo) => user.tipo === tipo);
  }
}
