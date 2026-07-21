import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { S3_CLIENT } from './s3.constants';

@Module({
  providers: [
    {
      provide: S3_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new S3Client({
          region: config.getOrThrow<string>('s3.region'),
          endpoint: config.get<string>('s3.endpoint'),
          credentials: {
            accessKeyId: config.getOrThrow<string>('s3.accessKeyId'),
            secretAccessKey: config.getOrThrow<string>('s3.secretAccessKey'),
          },
        }),
    },
  ],
  exports: [S3_CLIENT],
})
export class S3Module {}
