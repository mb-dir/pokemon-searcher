import axios from "axios";

export async function getPokemons() {
  const { data } = await axios.get(
    "https://pokeapi.co/api/v2/pokemon/?limit=100"
  );

  return data.results;
}

export async function singlePokemonPromise(url) {
  const { data } = await axios.get(url);

  return data;
}
