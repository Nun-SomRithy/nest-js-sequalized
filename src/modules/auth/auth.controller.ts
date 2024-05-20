import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../user/dto/users.dto';
import { ApiTags } from '@nestjs/swagger';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';

@ApiTags('User')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @UseGuards(DoesUserExist)
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}
