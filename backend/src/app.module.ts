import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { UsersModule } from './users/users.module';

config({ path: join(__dirname, '..', '.env'), quiet: true });

const dbUrl = process.env.DB;

if (!dbUrl) {
  throw new Error('Missing DB environment variable. Add DB to backend/.env');
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: dbUrl,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
