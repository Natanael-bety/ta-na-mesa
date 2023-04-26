import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(
    @Body() credentials: { username: string; senha: string; email: string },
  ) {
    const token = await this.authService.login(
      credentials.username,
      credentials.senha,
      credentials.email,
    );
    return { token };
  }
}
