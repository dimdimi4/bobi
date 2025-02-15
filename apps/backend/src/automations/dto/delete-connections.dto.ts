import { IsString, IsArray } from 'class-validator';

export class DeleteConnectionsDto {
  @IsArray()
  @IsString({ each: true })
  connectionIds: string[];
}
