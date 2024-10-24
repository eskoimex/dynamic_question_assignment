import { IsString } from 'class-validator';

export class GetQuestionDto {
  @IsString()
  regionId: string;
}
