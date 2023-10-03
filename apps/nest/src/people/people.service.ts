import { SWAPIPeopleResponse } from '@nx-nest-next-boilerplate/types';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PeopleService {
  constructor(private configService: ConfigService) {}

  async getPeople(page: number, search?: string): Promise<SWAPIPeopleResponse> {

    try {
      const base = this.configService.get<string>('SWAPI_BASE_URL');
      let url = `${base}/people/?page=${page}&format=json`;
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      const response = await axios.get(url);
      return response.data as SWAPIPeopleResponse;
    } catch (error) {
      console.error('Error fetching people data:', error);
    }
  }
}
