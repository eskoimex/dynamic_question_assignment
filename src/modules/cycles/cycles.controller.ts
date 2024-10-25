

import { Body, Controller, Patch, Param } from '@nestjs/common';
import { CyclesService } from './cycles.service';

@Controller('cycle')
export class CyclesController {
  constructor(private readonly cyclesService: CyclesService) {}

  @Patch('config/:regionId')
  async updateRegionCycleConfig(
    @Param('regionId') regionId: string,
    @Body() { cycleDuration, startDate }: { cycleDuration: number; startDate: Date },
  ) {
    return this.cyclesService.updateRegionCycleConfig(regionId, cycleDuration, startDate);
  }
}
