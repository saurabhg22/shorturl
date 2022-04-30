import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shorturl } from './shorturl.schema';

type EmittedFields = '_id' | 'id';

@Injectable()
export class ShorturlRepository {
  constructor(
    @InjectModel('Shorturl') private readonly shorturlModel: Model<Shorturl>,
  ) {}

  async create(shortUrl: Omit<Shorturl, EmittedFields>): Promise<Shorturl> {
    return this.shorturlModel.create(shortUrl);
  }

  async findOne(shortcode: string): Promise<Shorturl> {
    return this.shorturlModel.findOne({ shortcode });
  }

  async update(shortcode: string, updates: Partial<Shorturl>) {
    return this.shorturlModel.updateOne({ shortcode }, { $set: updates });
  }
}
