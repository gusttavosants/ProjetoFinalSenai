import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    if (!loginDto.email || !loginDto.senha) {
      throw new BadRequestException('Email e senha são obrigatórios');
    }
    return this.authService.login(loginDto.email, loginDto.senha);
  }
}
