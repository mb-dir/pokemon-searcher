import { useState, useEffect } from "react";

export const usePokemonList = () => {
  const [ pokemonList, setPokemonList ] = useState([]);
  const [ requestStatus, setRequestStatus ] = useState("pending");

  const createPokemonPromise = pokemonUrl => {
    return new Promise((resolve, reject) => {
      fetch(pokemonUrl)
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject.log(err));
    });
  };

  useEffect(() => {
    const pokemonsPromisesArray = [];
    const pokemonsProperInfo = [];
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=100")
      .then(res => res.json())
      .then(res => {
        res.results.forEach(el => {
          const pokemonPromise = createPokemonPromise(el.url);
          pokemonsPromisesArray.push(pokemonPromise);
        });
        return pokemonsPromisesArray;
      })
      .then(res => {
        (async function getPokemonInfo() {
          for (const pokemon of await Promise.all(res)) {
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
        })();
      })
      .catch(() => {
        setRequestStatus("rejected");
      });
  }, []);

  return {
    pokemonList,
    requestStatus,
  };
};
