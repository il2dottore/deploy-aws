import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('jwt.accessSecret'),
        signOptions: {
          // This is how I shut the ESLint mouth up. Please just look and don't judge :D.
          expiresIn: config.getOrThrow<string>(
            'jwt.accessExpiresIn',
          ) as unknown as Required<JwtModuleOptions>['signOptions']['expiresIn'],
        },
      }),
    }),
  ],
  providers: [JwtStrategy],
  // Export JwtModule, so if we import AuthLibModule, we can still use JwtService.
  exports: [JwtModule],
})
export class AuthLibModule {}
