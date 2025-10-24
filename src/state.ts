import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
	rl: Interface;
	commands: Record<string, CLICommand>;
	pokeapi: PokeAPI;
	cache: Cache;
	nextLocationsURL: string | undefined;
	prevLocationsURL: string | undefined;
};

export function initState(): State {
	// Create the readline interface
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "> ",
	});

	// Create cache with 5 minute interval (300000 ms)
	const cache = new Cache(300000);

	// Create the commands registry
	const commands: Record<string, CLICommand> = {
		help: {
			name: "help",
			description: "Displays a help message",
			callback: commandHelp,
		},
		exit: {
			name: "exit",
			description: "Exit the Pokedex",
			callback: commandExit,
		},
		map: {
			name: "map",
			description: "Displays the next 20 location areas",
			callback: commandMap,
		},
		mapb: {
			name: "mapb",
			description: "Displays the previous 20 location areas",
			callback: commandMapb,
		},
		explore: {
			name: "explore",
			description: "Explore a location area to find Pokemon",
			callback: commandExplore,
		},
	};

	return {
		rl,
		commands,
		pokeapi: new PokeAPI(cache),
		cache,
		nextLocationsURL: undefined,
		prevLocationsURL: undefined,
	};
}
