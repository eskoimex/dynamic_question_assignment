// src/modules/cycles/cycles.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { toZonedTime } from 'date-fns-tz';
import { differenceInDays } from 'date-fns';

@Injectable()
export class CyclesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrentCycle(regionId: string): Promise<number> {
    const region = await this.prisma.region.findUnique({ where: { id: regionId } });
    if (!region) {
      throw new Error(`Region with ID ${regionId} not found`);
    }

    const now = new Date();
    const startSGT = toZonedTime(region.startDate, 'Asia/Singapore');
    const daysElapsed = differenceInDays(now, startSGT);
    return Math.floor(daysElapsed / region.cycleDuration);
  }
}
