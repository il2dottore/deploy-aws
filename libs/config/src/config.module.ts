import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import databaseConfig from './namespaces/database.config';
import jwtConfig from './namespaces/jwt.config';
import redisConfig from './namespaces/redis.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig, jwtConfig, redisConfig],
      validationOptions: { abortEarly: false },
    }),
  ],
})
export class ConfigModule {}
