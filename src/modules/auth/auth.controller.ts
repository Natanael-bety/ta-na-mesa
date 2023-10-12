import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from '../../config/decorators/is-public.decorator';
import { LoginDto } from './dto/login.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { TotalCountInterceptor } from 'src/config/interceptors/total-count.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/create-usuario')
  @HttpCode(HttpStatus.OK)
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.createUsuario(createUsuarioDto);
  }

  @Get('/estabelecimento/:estabelecimentoId')
  @UseInterceptors(TotalCountInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  findAllColaboradore(@Param('estabelecimentoId') estabelecimentoId: string) {
    return this.authService.findAllColaboradore(estabelecimentoId);
  }
}
