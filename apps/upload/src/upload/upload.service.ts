import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { S3_CLIENT } from '@app/storage';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { Upload } from '../entities/upload.entity';

@Injectable()
export class UploadService {
  constructor(
    @Inject(S3_CLIENT) private readonly s3Client: S3Client,
    @InjectRepository(Upload) private readonly uploads: Repository<Upload>,
    private readonly config: ConfigService,
  ) {}

  async uploadFile(file: Express.Multer.File, title: string, userId: string) {
    const bucket = this.config.getOrThrow<string>('s3.bucket');
    const fileKey = `${userId}/${randomUUID()}-${file.originalname}`;
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );
    return this.uploads.save(
      this.uploads.create({
        title,
        content: '',
        mimeType: file.mimetype,
        fileUrl: `${this.config.get<string>('s3.endpoint')}/${bucket}/${fileKey}`,
        fileName: file.originalname,
        fileKey,
        fileSize: file.size,
        userId,
      }),
    );
  }

  async deleteFile(id: string) {
    const upload = await this.uploads.findOneBy({ id });
    if (!upload) throw new NotFoundException('Upload not found');
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.config.getOrThrow<string>('s3.bucket'),
        Key: upload.fileKey,
      }),
    );
    await this.uploads.remove(upload);
    return { deleted: true };
  }

  listFiles() {
    return this.uploads.find({ order: { createdAt: 'DESC' } });
  }

  async getFileMetadata(id: string) {
    const upload = await this.uploads.findOneBy({ id });
    if (!upload) throw new NotFoundException('Upload not found');
    const metadata = await this.s3Client.send(
      new HeadObjectCommand({
        Bucket: this.config.getOrThrow<string>('s3.bucket'),
        Key: upload.fileKey,
      }),
    );
    return { ...upload, s3Metadata: metadata };
  }
}
