export class PokeAPI {
	private static readonly baseURL = "https://pokeapi.co/api/v2";

	constructor() {}

	async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
		const url = pageURL || `${PokeAPI.baseURL}/location-area`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to fetch locations: ${response.statusText}`);
		}

		const data = await response.json();
		return data as ShallowLocations;
	}

	async fetchLocation(locationName: string): Promise<Location> {
		const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to fetch location: ${response.statusText}`);
		}

		const data = await response.json();
		return data as Location;
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
