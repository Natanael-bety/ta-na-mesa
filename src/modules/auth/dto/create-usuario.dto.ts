import { USUARIO_TIPO } from '../../../constants/usuario';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  senha: string;

  @IsNotEmpty()
  @IsEnum(USUARIO_TIPO)
  tipo: USUARIO_TIPO;

  // @IsNotEmpty()
  // @IsString()
  // @IsOptional()
  // estabelecimentoId?: string;
}
