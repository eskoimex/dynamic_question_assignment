
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AssignmentQueueService } from '../../queue/assignment.queue.service';

@Injectable()
export class CyclesService {
  constructor(
    private prisma: PrismaService,
    private assignmentQueueService: AssignmentQueueService,
  ) {}

  async getCurrentCycle(regionId: string): Promise<number> {
    // Fetch region configuration
    const region = await this.prisma.region.findUnique({
      where: { id: regionId },
    });

    if (!region) {
      throw new NotFoundException('Region not found');
    }

    const { startDate, cycleDuration } = region;
    const now = new Date();

    // Calculate the current cycle based on the region's startDate and cycleDuration
    const timeDifference = now.getTime() - new Date(startDate).getTime();
    const cycleNumber =
      Math.floor(timeDifference / (cycleDuration * 24 * 60 * 60 * 1000)) + 1;

    return cycleNumber;
  }

  async updateRegionCycleConfig(
    regionId: string,
    cycleDuration: number,
    startDate: Date,
  ): Promise<any> {
    if (cycleDuration <= 0) {
      throw new Error('Cycle duration must be a positive number');
    }

    const updatedRegion = await this.prisma.region.update({
      where: { id: regionId },
      data: { cycleDuration, startDate },
    });

    await this.assignmentQueueService.assignQuestionsToUsers(regionId);

    return updatedRegion;
  }
}
