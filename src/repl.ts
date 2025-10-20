import * as readline from "readline";
import { getCommands } from "./commands.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL(): void {
  // Get the command registry
  const commands = getCommands();

  // Create the readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  // Display the initial prompt
  rl.prompt();

  // Listen for line input
  rl.on("line", (input: string) => {
    // Parse the input into an array of words
    const words = cleanInput(input);

    // If input is empty, prompt again and exit callback
    if (words.length === 0 || words[0] === "") {
      rl.prompt();
      return;
    }

    // Get the command name (first word)
    const commandName = words[0];

    // Look up the command in the registry
    const command = commands[commandName];

    if (command) {
      // If command exists, call its callback
      try {
        command.callback(commands);
      } catch (error) {
        console.error(`Error executing command: ${error}`);
      }
    } else {
      // If command doesn't exist, print error message
      console.log("Unknown command");
    }

    // Give the user back control to type another command
    rl.prompt();
  });
}
