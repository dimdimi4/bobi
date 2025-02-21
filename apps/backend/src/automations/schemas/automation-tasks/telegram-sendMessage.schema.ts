import { Prop as MongooseProp, Schema } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

@Schema({ _id: false })
export class TelegramQuickReplyButton {
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
  text: string;

  @MongooseProp({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  url?: string;
}

@Schema({ _id: false })
export class TelegramTimeout {
  @MongooseProp({
    type: Number,
    required: true,
  })
  @IsNumber()
  duration: number;

  @MongooseProp({
    type: String,
    enum: ['seconds', 'minutes', 'hours', 'days'],
    required: true,
  })
  @IsString()
  @IsEnum(['seconds', 'minutes', 'hours', 'days'])
  unit: string;
}

@Schema({ _id: false })
export class TelegramSendMessageTask {
  @MongooseProp({
    type: String,
    required: true,
  })
  @IsString()
  message: string;

  @MongooseProp({
    type: [TelegramQuickReplyButton],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TelegramQuickReplyButton)
  quickReplyButtons: TelegramQuickReplyButton[];

  @MongooseProp({
    type: TelegramTimeout,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TelegramTimeout)
  timeout?: TelegramTimeout;
}
