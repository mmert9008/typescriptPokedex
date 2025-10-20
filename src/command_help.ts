import type { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>): void {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  // Iterate over all commands and print their descriptions
  for (const commandName in commands) {
    const command = commands[commandName];
    console.log(`${command.name}: ${command.description}`);
  }
}
