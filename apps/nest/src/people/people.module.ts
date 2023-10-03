import { ConfigModule } from '@nestjs/config';
import { Inject, Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';

@Module({
  providers: [PeopleService],
  controllers: [PeopleController],
  imports: [ConfigModule],
})
export class PeopleModule {
}
