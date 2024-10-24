import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './modules/questions/questions.module';
import { CyclesModule } from './modules/cycles/cycles.module';
// import { RedisModule } from './redis/redis.module';
// import { QueueModule } from './queue/queue.module';

@Module({
  imports: [QuestionsModule, CyclesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
