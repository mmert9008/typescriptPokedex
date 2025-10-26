import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor(cache: Cache) {
    this.#cache = cache;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

    const cached = this.#cache.get<ShallowLocations>(url);
    if (cached) {
      // console.log("Using cached data");
      return cached;
    }

    // console.log("Fetching from API...");
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`);
    }

    const data = await response.json();
    const locations = data as ShallowLocations;

    this.#cache.add(url, locations);

    return locations;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.#cache.get<Location>(url);
    if (cached) {
      // console.log("Using cached data");
      return cached;
    }

    // console.log("Fetching from API...");
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch location: ${response.statusText}`);
    }

    const data = await response.json();
    const location = data as Location;

    this.#cache.add(url, location);

    return location;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cached = this.#cache.get<Pokemon>(url);
    if (cached) {
      // console.log("Using cached data");
      return cached;
    }

    // console.log("Fetching from API...");
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon: ${response.statusText}`);
    }

    const data = await response.json();
    const pokemon = data as Pokemon;

    this.#cache.add(url, pokemon);

    return pokemon;
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: Array<unknown>;
  location: {
    name: string;
    url: string;
  };
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  pokemon_encounters: Array<{
    pokemon: {
      name: string;
      url: string;
    };
    version_details: Array<unknown>;
  }>;
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: Array<{
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    back_default: string | null;
    back_shiny: string | null;
  };
};
