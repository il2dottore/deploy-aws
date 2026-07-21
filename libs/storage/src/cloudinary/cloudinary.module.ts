import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CLOUDINARY_CLIENT } from './cloudinary.constants';
import { v2 as cloudinary } from 'cloudinary';

@Module({
  providers: [
    {
      provide: CLOUDINARY_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        cloudinary.config({
          cloud_name: config.getOrThrow<string>('cloudinary.cloudName'),
          api_key: config.getOrThrow<string>('cloudinary.apiKey'),
          api_secret: config.getOrThrow<string>('cloudinary.apiSecret'),
        });
        return cloudinary;
      },
    },
  ],
  exports: [CLOUDINARY_CLIENT],
})
export class CloudinaryModule {}
