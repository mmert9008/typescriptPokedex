import { Cache } from "./pokecache.js";

export class PokeAPI {
	private static readonly baseURL = "https://pokeapi.co/api/v2";
	#cache: Cache;

	constructor(cache: Cache) {
		this.#cache = cache;
	}

	async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
		const url = pageURL || `${PokeAPI.baseURL}/location-area`;

		// Check if we have cached data
		const cached = this.#cache.get<ShallowLocations>(url);
		if (cached) {
			console.log("Using cached data");
			return cached;
		}

		// Make the network request
		console.log("Fetching from API...");
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to fetch locations: ${response.statusText}`);
		}

		const data = await response.json();
		const locations = data as ShallowLocations;

		// Add to cache
		this.#cache.add(url, locations);

		return locations;
	}

	async fetchLocation(locationName: string): Promise<Location> {
		const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

		// Check if we have cached data
		const cached = this.#cache.get<Location>(url);
		if (cached) {
			console.log("Using cached data");
			return cached;
		}

		// Make the network request
		console.log("Fetching from API...");
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to fetch location: ${response.statusText}`);
		}

		const data = await response.json();
		const location = data as Location;

		// Add to cache
		this.#cache.add(url, location);

		return location;
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
	pokemon_encounters: Array<unknown>;
};
