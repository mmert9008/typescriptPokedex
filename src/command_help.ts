import type { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
	console.log("Welcome to the Pokedex!");
	console.log("Usage:\n");

	// Iterate over all commands and print their descriptions
	for (const commandName in state.commands) {
		const command = state.commands[commandName];
		console.log(`${command.name}: ${command.description}`);
	}
}
