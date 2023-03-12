import { useState, useEffect } from "react";
import { singlePokemonPromise, getPokemons } from "../services/pokemon";
import { getID } from "../helpers/getID";
import { REQUEST_STATUS } from "../enums";

export const usePokemonList = () => {
  const [ pokemonList, setPokemonList ] = useState([]);
  const [ requestStatus, setRequestStatus ] = useState<REQUEST_STATUS>(
    REQUEST_STATUS.PENDING
  );

  function createPokemonPromise(pokemonUrl: string) {
    return new Promise(async resolve => {
      try {
        resolve(singlePokemonPromise(pokemonUrl));
      } catch (e) {
        setRequestStatus(REQUEST_STATUS.REJECTED);
      }
    });
  }

  useEffect(() => {
    async function getPokemonPromises() {
      try {
        const pokemonsPromisesArray = [];

        //Returns array with basic info about pokemon, to get more data about pokemon we need to crete another promise based on pokemon url
        const pokemons = await getPokemons();

        await pokemons.forEach(pokemon => {
          const pokemonID = getID(pokemon.url);
          const pokemonPromise = createPokemonPromise(pokemonID);
          pokemonsPromisesArray.push(pokemonPromise);
        });

        return pokemonsPromisesArray;
      } catch (e) {
        setRequestStatus(REQUEST_STATUS.REJECTED);
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
        setRequestStatus(REQUEST_STATUS.RESOLVED);
      } catch (e) {
        setRequestStatus(REQUEST_STATUS.REJECTED);
      }
    })();
  }, []);

  return {
    pokemonList,
    requestStatus,
  };
};
