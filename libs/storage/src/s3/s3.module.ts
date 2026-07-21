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
          region: config.get<string>('aws.region')!,
          credentials: {
            accessKeyId: config.get<string>('aws.accessKeyId')!,
            secretAccessKey: config.get<string>('aws.secretAccessKey')!,
          },
        }),
    },
  ],
  exports: [S3_CLIENT],
})
export class S3Module {}
