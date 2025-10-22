import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
	const locationsData = await state.pokeapi.fetchLocations(
		state.nextLocationsURL,
	);

	// Update the state with new pagination URLs
	state.nextLocationsURL = locationsData.next ?? undefined;
	state.prevLocationsURL = locationsData.previous ?? undefined;

	// Print each location name
	for (const location of locationsData.results) {
		console.log(location.name);
	}
}
