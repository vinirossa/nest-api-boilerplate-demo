import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { INestApplication, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { type CollectionResult, convert } from 'openapi-to-postmanv2';
import { AppModule } from './app.module';
import { BETTER_AUTH_SWAGGER_PATHS } from './common/utils/better-auth-swagger';
import configurations from './config/configurations';

interface PostmanFolder {
  name: string;
  item: unknown[];
}

interface PostmanCollection {
  item?: unknown[];
}

function ensureEnvFile(): void {
  const nodeEnv = process.env.NODE_ENV ?? 'local';
  if (nodeEnv === 'production') {
    return;
  }

  const envPath = resolve(process.cwd(), '.env');
  const examplePath = resolve(process.cwd(), '.env.example');
  if (!existsSync(envPath) && existsSync(examplePath)) {
    copyFileSync(examplePath, envPath);
    Logger.log('Created .env from .env.example', 'Bootstrap');
  }
}

async function createApp(): Promise<INestApplication> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    bodyParser: false, // Required for Better Auth
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Serve static files from public directory (for Swagger custom JS)
  app.use(express.static(resolve(process.cwd(), 'public')));

  // Enable CORS with credentials for Better Auth cookies
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:8080', process.env.FRONTEND_URL].filter(Boolean),
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  // Enable API versioning with URI versioning (e.g., /v1/products, /v2/products)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  return app;
}

function isFolder(item: unknown): item is PostmanFolder {
  return (
    typeof item === 'object' && item !== null && 'item' in item && Array.isArray((item as { item?: unknown }).item)
  );
}

function findOrCreateAuthFolder(collection: PostmanCollection): PostmanFolder {
  if (!collection.item || !Array.isArray(collection.item)) {
    throw new Error('Invalid collection structure');
  }

  let authFolder = collection.item.find((item) => {
    return typeof item === 'object' && item !== null && 'name' in item && item.name === 'auth' && isFolder(item);
  }) as PostmanFolder | undefined;

  if (!authFolder || !isFolder(authFolder)) {
    authFolder = {
      name: 'auth',
      item: [],
    };
    collection.item.push(authFolder);
  }

  return authFolder;
}

function moveBetterAuthEndpointsToAuthFolder(collection: PostmanCollection, authFolder: PostmanFolder): void {
  if (!collection.item || !Array.isArray(collection.item)) {
    return;
  }

  const betterAuthEndpoints = ['/api/sign-up', '/api/sign-in', '/api/sign-out'];
  collection.item = collection.item.filter((item: unknown) => {
    if (typeof item === 'object' && item !== null && 'request' in item) {
      const request = (item as { request?: { url?: { path?: string[] } } }).request;
      const path = request?.url?.path?.join('/');
      if (betterAuthEndpoints.some((endpoint) => path?.includes(endpoint))) {
        authFolder.item.push(item);
        return false;
      }
    }
    return true;
  });
}

function reorganizePostmanCollection(collection: PostmanCollection): void {
  if (!collection.item || !Array.isArray(collection.item)) {
    return;
  }

  const authFolder = findOrCreateAuthFolder(collection);
  moveBetterAuthEndpointsToAuthFolder(collection, authFolder);
}

function createSwaggerConfig(): Omit<OpenAPIObject, 'paths'> {
  const port = configurations().app.port;
  return new DocumentBuilder()
    .setTitle('Nest.js API Boilerplate')
    .setDescription('A production-ready Nest.js API with Better Auth')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(`http://localhost:${port}`, 'Local environment')
    .build();
}

function setupSwagger(app: INestApplication, config: Omit<OpenAPIObject, 'paths'>): void {
  try {
    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

    // Add Better Auth endpoints to Swagger documentation
    Object.assign(document.paths, BETTER_AUTH_SWAGGER_PATHS);

    // Sort tags alphabetically
    if (document.tags && Array.isArray(document.tags)) {
      document.tags = document.tags.sort((a, b) => {
        const nameA = (a.name || '').toLowerCase();
        const nameB = (b.name || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });
    }

    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    });

    const documentString: string = JSON.stringify(document, null, 2);
    writeFileSync('docs/swagger.json', documentString, { encoding: 'utf8' });

    Logger.log('Swagger documentation generated', 'Bootstrap');

    // Generate Postman collection
    if (process.env.NODE_ENV !== 'production') {
      convert({ type: 'string', data: documentString }, {}, (_: unknown, conversionResult: CollectionResult) => {
        if (conversionResult.result) {
          const collection = conversionResult.output[0].data as PostmanCollection;

          // Reorganize Better Auth endpoints to "Auth" folder
          reorganizePostmanCollection(collection);

          const collectionString = JSON.stringify(collection, null, 2);
          writeFileSync('docs/collection.json', collectionString, { encoding: 'utf8' });
          Logger.log('Postman collection generated', 'Bootstrap');
        }
      });
    }
  } catch (error) {
    Logger.error('Error generating documentation', error, 'Bootstrap');
  }
}

async function bootstrap(): Promise<void> {
  ensureEnvFile();
  const app: INestApplication = await createApp();

  const config = createSwaggerConfig();
  setupSwagger(app, config);

  const port: number = configurations().app.port;
  await app.listen(port);

  Logger.log(`Application is running on: http://localhost:${port}`, 'Bootstrap');
  Logger.log(`Swagger documentation: http://localhost:${port}/api`, 'Bootstrap');
}

bootstrap();
