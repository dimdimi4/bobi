import { IsArray, IsString } from 'class-validator';

export class TelegramSendMessageTaskDto {
  @IsString()
  message: string;

  @IsArray()
  quickReplies: string[];
}
