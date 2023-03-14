import axios from "axios";
const axiosApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export async function getPokemons() {
  const { data } = await axiosApi.get("pokemon/?limit=100");

  return data.results;
}

export async function singlePokemonPromise(id: string) {
  const { data } = await axiosApi.get(`pokemon/${id}`);

  return data;
}
