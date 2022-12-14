import { useState, useEffect } from "react";
import { setItemToStorage, getItemFromStorage } from "../helpers/storage";

export const usePokedex = () => {
  const [ pokedexList, setPokedexList ] = useState(() => {
    return JSON.parse(getItemFromStorage("pokedex")) || [];
  });

  const addToPokedex = pokemon => {
    setPokedexList(prevList => {
      const isPokemonAlreadyExist = prevList.some(
        el => el.pokemonName === pokemon.pokemonName
      );
      return isPokemonAlreadyExist ? [ ...prevList ] : [ ...prevList, pokemon ];
    });
  };

  const deleteFromPokedex = ({ pokemonName }) => {
    setPokedexList(prevList => {
      return prevList.filter(el => el.pokemonName !== pokemonName);
    });
  };

  useEffect(
    () => {
      setItemToStorage("pokedex", JSON.stringify(pokedexList));
    },
    [ pokedexList ]
  );

  return { pokedexList, addToPokedex, deleteFromPokedex };
};
