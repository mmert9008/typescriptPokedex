import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  // Check if we're on the last page
  if (!state.nextLocationsURL && state.prevLocationsURL) {
    console.log("You're on the last page");
    return;
  }

  const locationsData = await state.pokeapi.fetchLocations(
    state.nextLocationsURL,
  );

  state.nextLocationsURL = locationsData.next ?? undefined;
  state.prevLocationsURL = locationsData.previous ?? undefined;

  for (const location of locationsData.results) {
    console.log(location.name);
  }
}
