import { IsString, IsEmail } from 'class-validator';

export class LoginRequestBody {
  @IsEmail()
  email: string;

  @IsString()
  senha: string;
}
