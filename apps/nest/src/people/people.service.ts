import { SWAPIPeopleResponse } from '@nx-nest-next-boilerplate/types';
import { Injectable, UseInterceptors } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PeopleService {
  constructor(private configService: ConfigService) {}

  async getPeople(page: number): Promise<any> {
    try {
      const base = this.configService.get<string>('SWAPI_BASE_URL');
      const url = `${base}/people/?page=${page}&format=json`;
      const response = await axios.get(url);
      return response.data as SWAPIPeopleResponse;
    } catch (error) {
      console.error('Error fetching people data:', error);
    }
  }
}
