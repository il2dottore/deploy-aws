import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CurrentUser } from '@app/auth/decorators/current-user.decorator';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '@app/auth/guards/jwt.guard';
import { Public } from '@app/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @ApiOperation({
    summary:
      'Login to account, return JWT access token and refresh token back to user',
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @ApiOperation({
    summary: 'Register a new user',
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({
    summary:
      'Return user profile without password field, also includes roles and non-duplicate merged permissions',
  })
  @ApiBearerAuth()
  @Get('me')
  async me(@CurrentUser('sub') userId: string) {
    return this.userService.getProfile(userId);
  }
}
