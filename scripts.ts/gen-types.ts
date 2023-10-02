import axios from 'axios';
import * as fs from 'fs';

// Define the resources
const resources = ['people', 'films', 'starships', 'vehicles', 'species', 'planets'];

// Function to fetch schema for a resource
async function fetchSchema(resource: string): Promise<any> {
  const response = await axios.get(`https://swapi.dev/api/${resource}/schema`);
  return response.data;
}
