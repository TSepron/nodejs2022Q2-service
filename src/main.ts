import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = YAML.load('doc/api.yaml');
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(LoggerService));

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
