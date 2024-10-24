import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { PrismaService } from '../../prisma/prisma.service';
import { QuestionsController } from './questions.controller';
import { RedisModule } from '../../redis/redis.module';
import { CyclesService } from '../cycles/cycles.service';
import { RedisService } from '../../redis/redis.service';

@Module({
  imports: [RedisModule],
  providers: [QuestionsService, PrismaService, CyclesService, RedisService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
