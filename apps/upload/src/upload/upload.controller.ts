import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt.guard';
import { CurrentUser } from '@app/auth/decorators/current-user.decorator';
import { UploadService } from './upload.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({
    summary: 'Upload file to S3 storage',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        title: { type: 'string' },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.uploadService.uploadFile(file, title, userId);
  }

  @ApiOperation({
    summary: 'Delete file from S3 storage',
  })
  @Delete(':id')
  async deleteFile(@Param('id') id: string) {
    return this.uploadService.deleteFile(id);
  }

  @ApiOperation({
    summary: 'Get list of files in S3 storage',
  })
  @Get()
  async listFiles() {
    return this.uploadService.listFiles();
  }

  @ApiOperation({
    summary: 'Get file metadata',
  })
  @Get(':id')
  async getFileMetadata(@Param('id') id: string) {
    return this.uploadService.getFileMetadata(id);
  }
}
