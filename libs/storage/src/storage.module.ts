import { Global, Module } from '@nestjs/common';
import { S3Module } from './s3/s3.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Global()
@Module({
  imports: [S3Module, CloudinaryModule],
  exports: [S3Module, CloudinaryModule],
})
export class StorageModule {}
