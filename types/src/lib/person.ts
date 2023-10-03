type URL = string;

interface Film {
    url: URL;
}

interface Species {
    url: URL;
}

interface Vehicle {
    url: URL;
}

interface Starship {
    url: URL;
}

export interface Person {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: URL;
    films: Film[];
    species: Species[];
    vehicles: Vehicle[];
    starships: Starship[];
    created: string;
    edited: string;
    url: URL;
}
