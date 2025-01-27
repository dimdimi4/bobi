import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type ChannelDocument = HydratedDocument<Channel>;

@Exclude()
@Schema({
  timestamps: true,
})
export class Channel {
  @Prop({
    type: String,
    required: true,
  })
  accountId: string;

  @Prop({
    type: String,
    required: true,
  })
  type: string;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  token: string;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
