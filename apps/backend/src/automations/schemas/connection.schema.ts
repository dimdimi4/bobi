import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';

@Schema({ _id: false })
@Expose()
export class Connection {
  @Prop({
    type: String,
    required: true,
  })
  id: string;

  @Prop({
    type: String,
    required: true,
  })
  sourceStepId: string;

  @Prop({
    type: String,
    required: false,
  })
  sourceHandleId?: string;

  @Prop({
    type: String,
    required: true,
  })
  targetStepId: string;

  @Prop({
    type: String,
    required: false,
  })
  targetHandleId?: string;
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection);
