import { Person } from './person';
import { Planet } from './planet';

export interface SWAPIResponse {
  count: number;
  next: URL | null;
  previous: URL | null;
}

export interface SWAPIPlanetsResponse extends SWAPIResponse {
  results: Planet[] | null;
}

export interface SWAPIPeopleResponse extends SWAPIResponse {
  results: Person[] | null;
}
