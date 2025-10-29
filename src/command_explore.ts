import type { State } from "./state.js";

export async function commandExplore(
	state: State,
	...args: string[]
): Promise<void> {
	if (args.length === 0) {
		console.log("Please provide a location area name to explore");
		return;
	}

	const locationName = args[0];
	console.log(`Exploring ${locationName}...`);

	try {
		const locationData = await state.pokeapi.fetchLocation(locationName);

		const pokemonNames = locationData.pokemon_encounters.map(
			(encounter) => encounter.pokemon.name,
		);

		if (pokemonNames.length === 0) {
			console.log("No Pokemon found in this area");
			return;
		}

		console.log("Found Pokemon:");
		for (const name of pokemonNames) {
			console.log(` - ${name}`);
		}
	} catch (error) {
		console.log(`Failed to explore ${locationName}: ${error}`);
	}
}
