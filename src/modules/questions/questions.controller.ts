
import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get(':regionId')
  async getQuestionForUser(@Param('regionId') regionId: string) {
      const question = await this.questionsService.getQuestionForUser(regionId);
      return question;
  }
}
