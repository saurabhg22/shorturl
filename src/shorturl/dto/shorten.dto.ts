import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ShortenDto {
  @IsNotEmpty()
  @ApiProperty()
  url: string;

  @IsOptional()
  @ApiProperty()
  shortcode?: string;
}
