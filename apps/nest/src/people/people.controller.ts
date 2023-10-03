import { Controller, Get, Query } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  getPeople(@Query('page') page = 1, @Query('search') search?: string) {
    return this.peopleService.getPeople(page, search);
  }
}
