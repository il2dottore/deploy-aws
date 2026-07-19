import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@app/config';
import { AuthLibModule } from '@app/auth';
import { HttpExceptionFilter, TransformInterceptor } from '@app/common';
import { DatabaseModule } from '@app/database';
import { RedisModule } from '@app/redis';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    RedisModule,
    DatabaseModule.forService('auth_service_db'),
    AuthLibModule,
    AuthModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class AppModule {}
