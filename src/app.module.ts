import { Module } from '@nestjs/common';
import { ShorturlModule } from './shorturl/shorturl.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { LoggerModule } from './shared/logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    ShorturlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
