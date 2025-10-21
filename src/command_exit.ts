import type { State } from "./state.js";

export function commandExit(state: State): void {
	console.log("Closing the Pokedex... Goodbye!");
	state.rl.close();
	process.exit(0);
}
