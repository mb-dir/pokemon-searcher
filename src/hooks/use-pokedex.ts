import { useState, useEffect } from "react";
import { setItemToStorage, getItemFromStorage } from "../helpers/storage";
import { toast } from "react-toastify";
import { singlePokemon } from "../types";

export const usePokedex = () => {
  const [ pokedexList, setPokedexList ] = useState(() => {
    return JSON.parse(getItemFromStorage("pokedex") || "[]");
  });

  const addToPokedex = (pokemon: singlePokemon) => {
    setPokedexList((prevList: singlePokemon[]) => {
      const isPokemonAlreadyExist = prevList.some(
        el => el.pokemonName === pokemon.pokemonName
      );

      if (isPokemonAlreadyExist) {
        toast.info(`${pokemon.pokemonName} is already in pokedex`);
        return [ ...prevList ];
      }
      toast.info(`${pokemon.pokemonName} was added`);
      return isPokemonAlreadyExist ? [ ...prevList ] : [ ...prevList, pokemon ];
    });
  };

  const deleteFromPokedex = (pokemon: singlePokemon) => {
    setPokedexList((prevList: singlePokemon[]) => {
      return prevList.filter(el => el.pokemonName !== pokemon.pokemonName);
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
