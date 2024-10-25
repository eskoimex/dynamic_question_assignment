// import { Module } from '@nestjs/common';
// import { CyclesService } from './cycles.service';
// import { CyclesController } from './cycles.controller';

// @Module({
//   controllers: [CyclesController],
//   providers: [CyclesService],
// })
// export class CyclesModule {}


import { Module } from '@nestjs/common';
import { QuestionsService } from '../questions/questions.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CyclesController } from './cycles.controller';
import { CyclesService } from '../cycles/cycles.service';
import { RedisService } from '../../redis/redis.service';
import { RedisModule } from '../../redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [CyclesService, PrismaService, QuestionsService, RedisService],
  controllers: [CyclesController],
})
export class CyclesModule {}
