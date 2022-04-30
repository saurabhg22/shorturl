import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LoggerService } from 'src/shared/logger/logger.service';
import { ShorturlRepository } from './shorturl.repository';
import { Shorturl } from './shorturl.schema';

const SHORT_CODE_LENGTH = 6;
const SHORT_CODE_CHARS =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';

@Injectable()
export class ShorturlService {
  constructor(
    private readonly repository: ShorturlRepository,
    private readonly loggerService: LoggerService,
  ) {}

  async create(url: string, shortcode?: string): Promise<Shorturl> {
    if (!url) {
      this.loggerService.error('URL is required');
      throw new BadRequestException('URL is required');
    }
    if (shortcode && !shortcode.match(/^[0-9a-zA-Z_]{4,}$/)) {
      this.loggerService.error('Shortcode is invalid', {
        url,
        shortcode,
      });
      throw new UnprocessableEntityException('Shortcode is invalid');
    }

    if (shortcode) {
      const shorturl = await this.repository.findOne(shortcode);
      if (shorturl) {
        this.loggerService.error('Shortcode already exists', {
          url,
          shortcode,
        });
        throw new ConflictException('Shortcode already exists');
      }
    }

    const _shortcode = shortcode || this.generateShortcode();

    return this.repository.create({
      url,
      lastSeenDate: null,
      redirectCount: 0,
      shortcode: _shortcode,
      startDate: new Date(),
    });
  }

  generateShortcode(): string {
    let shortcode = '';
    for (let i = 0; i < SHORT_CODE_LENGTH; i++) {
      shortcode +=
        SHORT_CODE_CHARS[Math.floor(Math.random() * SHORT_CODE_CHARS.length)];
    }
    return shortcode;
  }

  async get(shortcode: string) {
    const shorturl = await this.repository.findOne(shortcode);

    if (!shorturl) {
      this.loggerService.error('Shortcode not found', { shortcode });
      throw new NotFoundException('Shortcode not found');
    }

    await this.repository.update(shortcode, {
      lastSeenDate: new Date(),
      redirectCount: shorturl.redirectCount + 1,
    });

    return shorturl.url;
  }

  async stats(shortcode: string) {
    const shorturl = await this.repository.findOne(shortcode);

    if (!shorturl) {
      this.loggerService.error('Shortcode not found', { shortcode });
      throw new NotFoundException('Shortcode not found');
    }

    return {
      startDate: shorturl.startDate,
      lastSeenDate: shorturl.lastSeenDate,
      redirectCount: shorturl.redirectCount,
    };
  }
}
