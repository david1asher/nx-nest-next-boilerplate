import { ConfigModule } from '@nestjs/config';
import { Inject, Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Module({
  providers: [PlanetsService],
  controllers: [PlanetsController],
  imports: [ConfigModule],
})
export class PlanetsModule {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
}
