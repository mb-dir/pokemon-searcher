import { useState, useEffect } from "react";

export const usePokemonList = () => {
  const [ pokemonList, setPokemonList ] = useState([]);
  const [ requestStatus, setRequestStatus ] = useState("pending");

  function createPokemonPromise(pokemonUrl) {
    return new Promise(async resolve => {
      try {
        const pokemonPromise = await fetch(pokemonUrl);
        const pokemonPromiseResponse = await pokemonPromise.json();
        resolve(pokemonPromiseResponse);
      } catch (e) {
        setRequestStatus("rejected");
      }
    });
  }

  useEffect(() => {
    async function getPokemonPromises() {
      try {
        const pokemonsPromisesArray = [];

        const pokemons = await fetch(
          "https://pokeapi.co/api/v2/pokemon/?limit=100"
        );
        const pokemonsResponse = await pokemons.json();

        await pokemonsResponse.results.forEach(pokemon => {
          const pokemonPromise = createPokemonPromise(pokemon.url);
          pokemonsPromisesArray.push(pokemonPromise);
        });

        return pokemonsPromisesArray;
      } catch (e) {
        setRequestStatus("rejected");
      }
    }

    (async function getPokemonInfo() {
      try {
        const pokemonsProperInfo = [];
        for await (const pokemon of await getPokemonPromises()) {
          const {
            abilities,
            name,
            sprites,
            types,
            base_experience,
            height,
            weight,
          } = pokemon;
          const pokemonObj = {
            pokemonName: name,
            pokemonAbilities: abilities,
            pokemonTypes: types,
            pokemonImg: sprites.front_default,
            pokemonBaseExperience: base_experience,
            pokemonHeight: height,
            pokemonWeight: weight,
          };

          pokemonsProperInfo.push(pokemonObj);
        }
        setPokemonList(pokemonsProperInfo);
        setRequestStatus("resovled");
      } catch (e) {
        setRequestStatus("rejected");
      }
    })();
  }, []);

  return {
    pokemonList,
    requestStatus,
  };
};
