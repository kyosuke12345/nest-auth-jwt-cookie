import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `env/local.env`,
      isGlobal: true,
    }),
  ],
  providers: [DatabaseConfig],
  exports: [DatabaseConfig],
})
export class ConfModule {}
