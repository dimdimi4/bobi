import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';

@Schema({ _id: false })
@Expose()
export class StepPosition {
  @Prop({
    type: Number,
    required: true,
  })
  x: number;

  @Prop({
    type: Number,
    required: true,
  })
  y: number;
}

export const StepPositionSchema = SchemaFactory.createForClass(StepPosition);
