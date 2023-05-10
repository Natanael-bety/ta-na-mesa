import { IsString, IsEmail } from 'class-validator';

export class LoginRequestBody {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  senha: string;
}
