import { SetMetadata } from '@nestjs/common';
import { USUARIO_TIPO } from 'src/constants/usuario';

export const TIPOS_KEYS = 'tipos';
export const Tipos = (...tipos: USUARIO_TIPO[]) =>
  SetMetadata(TIPOS_KEYS, tipos);
