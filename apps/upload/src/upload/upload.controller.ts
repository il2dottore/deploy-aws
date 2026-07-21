import { Controller, Delete, Get, Post } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({
    summary: 'Upload file to S3 storage',
  })
  @Post()
  async uploadFile() {}

  @ApiOperation({
    summary: 'Delete file from S3 storage',
  })
  @Delete()
  async deleteFile() {}

  @ApiOperation({
    summary: 'Get list of files in S3 storage',
  })
  @Get()
  async listFiles() {}

  @ApiOperation({
    summary: 'Get file metadata',
  })
  @Get(':id')
  async getFileMetadata() {}
}
