import * as readline from "readline";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL(): void {
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

    // Print the first word back to the user
    console.log(`Your command was: ${words[0]}`);

    // Give the user back control to type another command
    rl.prompt();
  });
}
