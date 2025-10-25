import type { State } from "./state.js";

export async function commandInspect(
  state: State,
  ...args: string[]
): Promise<void> {
  // Check if Pokemon name was provided
  if (args.length === 0) {
    console.log("Please provide a Pokemon name to inspect");
    return;
  }

  const pokemonName = args[0];

  // Check if the Pokemon has been caught
  const pokemon = state.pokedex[pokemonName];

  if (!pokemon) {
    console.log("you have not caught that pokemon");
    return;
  }

  // Display Pokemon details
  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log("Stats:");
  for (const statData of pokemon.stats) {
    console.log(`  -${statData.stat.name}: ${statData.base_stat}`);
  }
  console.log("Types:");
  for (const typeData of pokemon.types) {
    console.log(`  - ${typeData.type.name}`);
  }
}
