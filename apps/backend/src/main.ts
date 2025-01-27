import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Autobot API')
    .setDescription('Autobot API description')
    .setVersion('1.0')
    .addTag('autobot')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (_: string, methodKey: string, version?: string) => {
      return [methodKey, version?.toUpperCase()].filter(Boolean).join('');
    },
  });

  // Save the swagger spec to a file if SWAGGER_GENERATE_SPEC env var is set
  if (process.env.SWAGGER_GENERATE_SPEC) {
    fs.writeFileSync('./openapi-spec.json', JSON.stringify(document, null, 2));
    console.log('OpenAPI spec generated at ./openapi-spec.json');
    process.exit(0);
  }

  SwaggerModule.setup('openapi', app, document);

  await app.listen(process.env.PORT ?? 3000);

  console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
}

void bootstrap();
