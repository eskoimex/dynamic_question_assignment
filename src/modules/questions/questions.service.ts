import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from '../../redis/redis.service';
import { CyclesService } from '../cycles/cycles.service';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
    private readonly cyclesService: CyclesService,
  ) {}

  async getQuestionForUser(regionId: string): Promise<any> {
    const cycleIndex = await this.cyclesService.getCurrentCycle(regionId);
    const cachedQuestion = await this.redisService.getQuestionFromCache(
      regionId,
      cycleIndex,
    );

    if (cachedQuestion) {
      return JSON.parse(cachedQuestion);
    }

    // Fetch question from the DB if not found in cache
    const question = await this.prisma.question.findFirst({
      where: { regionId, cycle: cycleIndex },
    });

    if (!question) {
      throw new Error(
        `No question found for cycle ${cycleIndex} in region ${regionId}`,
      );
    }

    // Cache the result
    await this.redisService.setQuestionInCache(regionId, cycleIndex, question);
    return question;
  }
}
