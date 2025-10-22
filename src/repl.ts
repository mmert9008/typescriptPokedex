import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
	return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL(state: State): void {
	// Display the initial prompt
	state.rl.prompt();

	// Listen for line input
	state.rl.on("line", async (input: string) => {
		// Parse the input into an array of words
		const words = cleanInput(input);

		// If input is empty, prompt again and exit callback
		if (words.length === 0 || words[0] === "") {
			state.rl.prompt();
			return;
		}

		// Get the command name (first word)
		const commandName = words[0];

		// Look up the command in the registry
		const command = state.commands[commandName];

		if (command) {
			// If command exists, call its callback
			try {
				await command.callback(state);
			} catch (error) {
				console.error(`Error executing command: ${error}`);
			}
		} else {
			// If command doesn't exist, print error message
			console.log("Unknown command");
		}

		// Give the user back control to type another command
		state.rl.prompt();
	});
}
