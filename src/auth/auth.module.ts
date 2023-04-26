import { Module } from '@nestjs/common';
import { UsuarioModule } from 'src/modules/usuario/usuario.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioService } from 'src/modules/usuario/usuario.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'my-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    UsuarioModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsuarioService],
})
export class AuthModule {}
