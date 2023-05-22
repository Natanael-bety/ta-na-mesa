import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Usuario } from 'src/models/usuario.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: {
    email: string;
    username: string;
  }): Promise<Usuario> {
    const user = await this.authService.validateTokenData(payload);

    if (!user) {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
