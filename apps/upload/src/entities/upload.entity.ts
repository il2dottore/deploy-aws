import { BaseEntity } from '@app/common';
import { Entity, Column } from 'typeorm';

export enum FileStatus {
  QUEUED = 'queued',
  UPLOADING = 'uploading',
  ERROR = 'error',
  UPLOADED = 'uploaded',
}

@Entity('uploads')
export class Upload extends BaseEntity {
  @Column({ nullable: false, type: 'text' })
  title!: string;

  @Column({ nullable: false, type: 'text' })
  content!: string;

  @Column({ nullable: false, length: 255 })
  mimeType!: string;

  @Column({ nullable: false, type: 'text' })
  fileUrl!: string;

  @Column({ nullable: false, length: 255 })
  fileName!: string;

  @Column({ nullable: false, length: 1024 })
  fileKey!: string;

  @Column({ nullable: false })
  fileSize!: number;

  @Column({
    type: 'enum',
    enum: FileStatus,
    default: FileStatus.QUEUED,
    nullable: false,
  })
  fileStatus!: FileStatus;

  @Column({ nullable: false, type: 'uuid' })
  userId!: string;
}
