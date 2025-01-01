import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { databaseConfig } from './env.config';

ConfigModule.forRoot({
  isGlobal: true,
  cache: true,
  envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
  load: [databaseConfig]
});

export const typeOrmConfig : TypeOrmModuleOptions = {
  type: 'mysql',
  ...databaseConfig(),
  autoLoadEntities: false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['dist/**/migrations/*{.js,.ts}'],
  synchronize: true, // Do not make it true in production
};

export default typeOrmConfig;
export const connectionSource = new DataSource(
  typeOrmConfig as DataSourceOptions,
);
