import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ShortenDto } from './dto/shorten.dto';
import { ShorturlService } from './shorturl.service';

@Controller('shorturl')
export class ShorturlController {
  constructor(private readonly shorturlService: ShorturlService) {}

  @Post('/shorten')
  async shorten(@Body() shortenDto: ShortenDto) {
    const shorturl = await this.shorturlService.create(
      shortenDto.url,
      shortenDto.shortcode,
    );

    return {
      shortcode: shorturl.shortcode,
    };
  }

  @Get('/:shortcode')
  async get(@Param('shortcode') shortcode: string, @Res() res) {
    const shorturl = await this.shorturlService.get(shortcode);

    res.redirect(shorturl);
  }

  @Get('/:shortcode/stats')
  async stats(@Param('shortcode') shortcode: string) {
    const stats = await this.shorturlService.stats(shortcode);

    return stats;
  }
}
