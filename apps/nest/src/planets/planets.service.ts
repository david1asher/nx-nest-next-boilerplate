import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Injectable, UseInterceptors } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PlanetsService {
  private readonly SWAPI_URL = 'https://swapi.dev/api/planets';

  @CacheTTL(600000000)
  @UseInterceptors(CacheInterceptor)
  async getPlanets(page: number): Promise<any> {


    console.log("printer", "___________________________________________")
    console.log("printer", "imhere",  `~/nx-nest-next-boilerplate/apps/nest/src/planets/planets.service.ts:18`)
    console.log('printer', `${this.SWAPI_URL}/?page=${page}&format=json`);
    console.log("printer", "___________________________________________")

    const response = await axios.get(
      `${this.SWAPI_URL}/?page=${page}&format=json`
    );
    return response.data;
  }
}
