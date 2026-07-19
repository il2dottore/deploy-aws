import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {
  static forService(database: string): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            type: 'postgres',
            host: config.get<string>('database.host'),
            port: config.get<number>('database.port'),
            username: config.get<string>('database.user'),
            password: config.get<string>('database.pass'),
            database: database,
            autoLoadEntities: true,
            synchronize: false,
            retryAttempts: 1,
          }),
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}
