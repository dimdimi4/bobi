import { Prop as MongooseProp, Schema } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

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
}
