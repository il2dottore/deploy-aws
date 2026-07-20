import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto } from './dtos/register.dto';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@app/auth/interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Login to account, return JWT access token and refresh token back to user
   * @param {LoginDto} loginDto
   * @returns
   */
  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordValid = await argon2.verify(user.password, loginDto.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // User without password
    const userWithoutPassword = { ...user } as Omit<User, 'password'>;
    Reflect.deleteProperty(userWithoutPassword, 'password');

    const tokenPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const response = {
      accessToken: await this.jwtService.signAsync(tokenPayload),
      // See libs/auth/src/auth-lib.module.ts:16:"// This is how" for more information
      refreshToken: await this.jwtService.signAsync(tokenPayload, {
        secret: this.configService.getOrThrow<string>('jwt.refreshSecret'),
        expiresIn: this.configService.getOrThrow<string>(
          'jwt.refreshExpiresIn',
        ) as unknown as Required<JwtModuleOptions>['signOptions']['expiresIn'],
      }),
    };
    return response;
  }

  /**
   * Create an account, nothing more, nothing less
   * @param {RegisterDto} registerDto
   * @returns
   */
  async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await argon2.hash(registerDto.password);

    const user = this.userRepository.create({
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }
}
