export async function getPokemons() {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=100");
  const dataJSON = await data.json();
  const { results } = dataJSON;

  return results;
}

export async function singlePokemonPromise(url) {
  const data = await fetch(url);
  const dataJSON = await data.json();

  return dataJSON;
}
