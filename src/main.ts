import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();
import { Client } from 'pg';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = YAML.load('doc/api.yaml');
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 4000);

  console.log(process.env.DATABASE_URL);

  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_DB,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.PGPORT),
  });
  client.connect((err) => console.log(err));
  client.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    client.end();
  });
}

bootstrap();
