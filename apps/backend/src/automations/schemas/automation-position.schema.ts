import { Prop as MongooseProp, Schema } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';

@Schema({ _id: false })
export class AutomationPosition {
  @MongooseProp({
    type: Number,
    required: true,
  })
  @IsNumber()
  x: number;

  @MongooseProp({
    type: Number,
    required: true,
  })
  @IsNumber()
  y: number;
}
