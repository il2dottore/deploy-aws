import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@app/config';
import { AuthLibModule } from '@app/auth';
import { HttpExceptionFilter, TransformInterceptor } from '@app/common';
import { DatabaseModule } from '@app/database';
import { RedisModule } from '@app/redis';
import { UploadModule } from './upload/upload.module';
import { StorageModule } from '@app/storage';

@Module({
  imports: [
    // Lib modules
    ConfigModule,
    RedisModule,
    DatabaseModule.forService('upload_service_db'),
    AuthLibModule,
    StorageModule,
    // Service modules
    UploadModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
  controllers: [],
})
export class AppModule {}
