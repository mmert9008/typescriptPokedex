import type { State } from "./state.js";

export async function commandMapb(state: State): Promise<void> {
	// Check if we're on the first page
	if (!state.prevLocationsURL) {
		console.log("you're on the first page");
		return;
	}

	const locationsData = await state.pokeapi.fetchLocations(
		state.prevLocationsURL,
	);

	// Update the state with new pagination URLs
	state.nextLocationsURL = locationsData.next ?? undefined;
	state.prevLocationsURL = locationsData.previous ?? undefined;

	// Print each location name
	for (const location of locationsData.results) {
		console.log(location.name);
	}
}
