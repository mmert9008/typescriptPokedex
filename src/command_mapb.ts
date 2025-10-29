import type { State } from "./state.js";

export async function commandMapb(state: State): Promise<void> {
	if (!state.prevLocationsURL) {
		console.log("You're on the first page");
		return;
	}

	const locationsData = await state.pokeapi.fetchLocations(
		state.prevLocationsURL,
	);

	state.nextLocationsURL = locationsData.next ?? undefined;
	state.prevLocationsURL = locationsData.previous ?? undefined;

	for (const location of locationsData.results) {
		console.log(location.name);
	}
}
