import { Module } from '@nestjs/common';
import { UsuarioModule } from 'src/modules/usuario/usuario.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategys/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { Estabelecimento } from 'src/models/estabelecimento.model';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '90 days',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
