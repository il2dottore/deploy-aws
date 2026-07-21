import { Inject, Injectable } from '@nestjs/common';
import { S3_CLIENT } from '@app/storage';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
  constructor(@Inject(S3_CLIENT) private readonly s3Client: S3Client) {}
  async uploadFile() {}
  async deleteFile() {}
  async listFiles() {}
  async getFileMetadata() {}
}
