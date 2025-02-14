import { IsOptional, IsString } from 'class-validator';
import { Prop as MongooseProp, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class AutomationConnection {
  @MongooseProp({
    type: String,
    required: true,
  })
  @IsString()
  id: string;

  @MongooseProp({
    type: String,
    required: true,
  })
  @IsString()
  sourceStepId: string;

  @MongooseProp({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  sourceHandleId?: string;

  @MongooseProp({
    type: String,
    required: true,
  })
  @IsString()
  targetStepId: string;

  @MongooseProp({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  targetHandleId?: string;
}
