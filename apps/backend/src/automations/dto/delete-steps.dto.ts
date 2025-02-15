import { IsString, IsArray } from 'class-validator';

export class DeleteStepsDto {
  @IsArray()
  @IsString({ each: true })
  stepIds: string[];
}
