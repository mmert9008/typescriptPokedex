import type { State } from "./state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length === 0) {
    console.log("Please provide a Pokemon name to catch");
    return;
  }

  const pokemonName = args[0];
  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  try {
    const pokemonData = await state.pokeapi.fetchPokemon(pokemonName);

    if (state.pokedex[pokemonName]) {
      console.log(`You already caught ${pokemonName}!`);
      return;
    }

    const catchChance = Math.max(0.1, 1 - pokemonData.base_experience / 600);
    const randomValue = Math.random();

    if (randomValue < catchChance) {
      state.pokedex[pokemonName] = pokemonData;
      console.log(`${pokemonName} was caught!`);
    } else {
      console.log(`${pokemonName} escaped!`);
    }
  } catch (error) {
    console.log(`Failed to catch ${pokemonName}: ${error}`);
  }
}
