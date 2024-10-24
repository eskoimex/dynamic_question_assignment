// src/modules/queue/assignment.queue.service.ts
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AssignmentQueueService {
  constructor(@InjectQueue('assignment') private assignmentQueue: Queue) {}

  async assignQuestionsToUsers(regionId: string) {
    // Batch processing of user assignments
    await this.assignmentQueue.add('assign-question', { regionId });
  }
}
