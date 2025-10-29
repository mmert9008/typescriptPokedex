import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
	return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL(state: State): void {
	state.rl.prompt();

	state.rl.on("line", async (input: string) => {
		const words = cleanInput(input);

		if (words.length === 0 || words[0] === "") {
			state.rl.prompt();
			return;
		}

		const commandName = words[0];

		const args = words.slice(1);

		const command = state.commands[commandName];

		if (command) {
			try {
				await command.callback(state, ...args);
			} catch (error) {
				console.error(`Error executing command: ${error}`);
			}
		} else {
			console.log("Unknown command");
		}

		state.rl.prompt();
	});
}
