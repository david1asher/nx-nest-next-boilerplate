import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Injectable, UseInterceptors } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PlanetsService {
  private readonly SWAPI_URL = 'https://swapi.dev/api/planets';

  @CacheTTL(600000000)
  @UseInterceptors(CacheInterceptor)
  async getPlanets(page: number): Promise<any> {
    const response = await axios.get(
      `${this.SWAPI_URL}/?page=${page}&format=json`
    );
    return response.data;
  }
}
