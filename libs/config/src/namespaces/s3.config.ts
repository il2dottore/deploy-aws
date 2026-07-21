import { registerAs } from '@nestjs/config';

export default registerAs('s3', () => ({
  region: process.env.S3_REGION ?? 'ap-southeast-1',
  endpoint: process.env.S3_ENDPOINT ?? 'localhost',
  accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
}));
