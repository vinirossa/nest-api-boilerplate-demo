import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { AcceptLanguageResolver, HeaderResolver, I18nModule } from 'nestjs-i18n';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache';
import { ErrorLoggingInterceptor, LoggingInterceptor } from './common';
import Configurations from './config/configurations';
import { validate } from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { SeederModule } from './database/seeders/seeder.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { RolesGuard } from './rbac/guards/roles.guard';
import { RbacModule } from './rbac/rbac.module';

// Conditional imports for regular vs test environments
const imports = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [Configurations],
    envFilePath: ['.env', '.env.local'].filter(Boolean) as string[],
    validate,
  }),
  LoggerModule.forRoot({
    pinoHttp: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      transport:
        process.env.NODE_ENV !== 'production'
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
                levelFirst: true,
                translateTime: 'yyyy-mm-dd HH:MM:ss',
              },
            }
          : undefined,
    },
  }),
  I18nModule.forRoot({
    fallbackLanguage: 'en',
    loaderOptions: {
      path: join(__dirname, '/i18n/'),
      watch: true,
    },
    resolvers: [AcceptLanguageResolver, new HeaderResolver(['x-lang'])],
  }),
  EventEmitterModule.forRoot({
    wildcard: false,
    delimiter: '.',
    newListener: false,
    removeListener: false,
    maxListeners: 10,
    verboseMemoryLeak: false,
    ignoreErrors: false,
  }),
  CqrsModule.forRoot(),
  ThrottlerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      throttlers: [
        {
          ttl: configService.get<number>('throttle.ttl', 60000),
          limit: configService.get<number>('throttle.limit', 100),
        },
      ],
    }),
  }),
  CacheModule,
  DatabaseModule,
  // Only load SeederModule in non-test environments to avoid ESM issues with faker
  ...(process.env.NODE_ENV !== 'test' ? [SeederModule] : []),
  AuthModule, // AuthModule must come before RbacModule so CustomAuthGuard runs first
  RbacModule,
  ProductsModule,
  UsersModule,
];

@Module({
  imports,
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // First: Check authentication with Better Auth
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Second: Check roles/permissions
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorLoggingInterceptor,
    },
  ],
})
export class AppModule {}
