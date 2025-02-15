import { Prop as MongooseProp, Schema } from '@nestjs/mongoose';
import { IsArray, IsOptional, IsString } from 'class-validator';

@Schema({ _id: false })
export class TriggerReceivedMessageTask {
  @MongooseProp({
    type: String,
    required: true,
  })
  @IsString()
  condition: string; // any / exact / contains

  @MongooseProp({
    type: [String],
    required: true,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  templates?: string[];
}
