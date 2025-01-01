import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: process.env.APP_PORT,
  environment: process.env.NODE_ENV || 'development',
}));

export const jwtConfig = registerAs('jwt', () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  saltRount: parseInt(process.env.SALT_ROUND, 10) || 12,
  accessTokenExpiration: '15m',
  refreshTokenExpiration: '7d',
}));

export const databaseConfig = registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_DATABASE || 'auth_db',
  debug: process.env.MYSQL_DEBUG === 'true' || false,
  synchronize: process.env.MYSQL_SYNCHRONIZE === 'true' || false, // turning it to true will automatically make changes to the database schema
  logging: process.env.MYSQL_LOGGING === 'true' || false,
}));