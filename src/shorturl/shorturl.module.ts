import { Module } from '@nestjs/common';
import { ShorturlRepository } from './shorturl.repository';
import { ShorturlService } from './shorturl.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Shorturl, ShorturlSchema } from './shorturl.schema';
import { ShorturlController } from './shorturl.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shorturl.name, schema: ShorturlSchema },
    ]),
  ],
  providers: [ShorturlService, ShorturlRepository],
  controllers: [ShorturlController],
})
export class ShorturlModule {}
