import { Controller, Get, Query } from '@nestjs/common';
import { PlanetsService } from './planets.service';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  getPlanets(@Query('page') page = 1) {
    console.log(
      'printer',
      'imhere',
      '~/nx-nest-next-boilerplate/apps/nest/src/planets/planets.controller.ts:10'
    );
    return this.planetsService.getPlanets(page);
  }
}
