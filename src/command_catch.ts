import type { State } from "./state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  // Check if Pokemon name was provided
  if (args.length === 0) {
    console.log("Please provide a Pokemon name to catch");
    return;
  }

  const pokemonName = args[0];
  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  try {
    // Fetch the Pokemon data
    const pokemonData = await state.pokeapi.fetchPokemon(pokemonName);

    // Check if Pokemon is already caught
    if (state.pokedex[pokemonName]) {
      console.log(`You already caught ${pokemonName}!`);
      return;
    }

    // Calculate catch chance based on base experience
    // Higher base experience = harder to catch
    // Formula: chance decreases as base experience increases
    // Max base experience is around 600-700, so we'll use that as reference
    const catchChance = Math.max(0.1, 1 - pokemonData.base_experience / 600);
    const randomValue = Math.random();

    if (randomValue < catchChance) {
      // Caught!
      state.pokedex[pokemonName] = pokemonData;
      console.log(`${pokemonName} was caught!`);
    } else {
      // Escaped!
      console.log(`${pokemonName} escaped!`);
    }
  } catch (error) {
    console.log(`Failed to catch ${pokemonName}: ${error}`);
  }
}
