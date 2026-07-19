import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('AWS Deploy — Auth Service')
    .setDescription('Login, register, refresh, device sessions')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));

  const port = process.env.AUTH_SERVICE_PORT ?? 3001;
  await app.listen(port);
  console.log(`🔐 auth-service listening on :${port}`);
  console.log('青春有太多');
  console.log('未知的猜测');
  console.log('成长的烦恼算什么');
}
void bootstrap();
