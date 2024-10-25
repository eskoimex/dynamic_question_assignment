// // src/modules/cycles/cycles.service.ts
// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { toZonedTime } from 'date-fns-tz';
// import { differenceInDays } from 'date-fns';

// @Injectable()
// export class CyclesService {
//   constructor(private readonly prisma: PrismaService) {}

//   async getCurrentCycle(regionId: string): Promise<number> {
//     const region = await this.prisma.region.findUnique({ where: { id: regionId } });
//     if (!region) {
//       throw new Error(`Region with ID ${regionId} not found`);
//     }

//     const now = new Date();
//     const startSGT = toZonedTime(region.startDate, 'Asia/Singapore');
//     const daysElapsed = differenceInDays(now, startSGT);
//     return Math.floor(daysElapsed / region.cycleDuration);
//   }
// }
// cycle.service.ts
// cycle.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CyclesService {
  constructor(private prisma: PrismaService) {}

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
    const cycleNumber = Math.floor(timeDifference / (cycleDuration * 24 * 60 * 60 * 1000)) + 1;

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

    return updatedRegion;
  }
}
