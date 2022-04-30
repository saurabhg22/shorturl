import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Shorturl {
  @Prop({ required: true, unique: true })
  shortcode: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({})
  lastSeenDate: Date;

  @Prop({ default: 0 })
  redirectCount: number;
}

export const ShorturlSchema = SchemaFactory.createForClass(Shorturl);
