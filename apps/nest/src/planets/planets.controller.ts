import { Controller, Get, Query } from '@nestjs/common';
import { PlanetsService } from './planets.service';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  getPlanets(@Query('page') page = 1, @Query('search') search?: string) {
    return this.planetsService.getPlanets(page, search);
  }
}
