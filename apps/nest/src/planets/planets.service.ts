import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Injectable, UseInterceptors } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { SWAPIPlanetsResponse } from '@nx-nest-next-boilerplate/types';

@Injectable()
export class PlanetsService {
  constructor(private configService: ConfigService) {}

  @CacheTTL(1000 * 60 * 5) // 5 minutes cache
  @UseInterceptors(CacheInterceptor)
  async getPlanets(
    page: number,
    search?: string
  ): Promise<SWAPIPlanetsResponse> {
    const base = this.configService.get<string>('SWAPI_BASE_URL');
    let url = `${base}/planets/?page=${page}&format=json`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    const response = await axios.get(url);
    return response.data as SWAPIPlanetsResponse;
  }
}
