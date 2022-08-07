import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { ExceptionFilter } from './custom-exception.filter';
dotenv.config();

function setExtraLoggerHandlers(LoggerService) {
  const loggerService: LoggerService = new LoggerService(LoggerService.name);

  process.on('unhandledRejection', (reason, promise) => {
    loggerService.error({
      message: 'Unhandled rejection occurred',
      reason,
      promise,
    });
  });

  process.on('uncaughtException', (err: Error) => {
    loggerService.error({
      message: `Uncaught exception occurred`,
      err,
    });
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = YAML.load('doc/api.yaml');
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(LoggerService));
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionFilter(httpAdapter));

  setExtraLoggerHandlers(LoggerService);

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
