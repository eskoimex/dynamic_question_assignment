// src/modules/redis/redis.service.ts
import { Injectable } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';

@Injectable()
export class RedisService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({ url: process.env.REDIS_URL });
    this.client.connect();
  }

  async getQuestionFromCache(
    regionId: string,
    cycleIndex: number,
  ): Promise<string> {
    return this.client.get(`question:${regionId}:${cycleIndex}`);
  }

  async setQuestionInCache(
    regionId: string,
    cycleIndex: number,
    question: any,
  ): Promise<void> {
    await this.client.set(
      `question:${regionId}:${cycleIndex}`,
      JSON.stringify(question),
      { EX: 3600 },
    );
  }
}
