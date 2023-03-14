import "./PokemonList.css";
import { ToastContainer } from "react-toastify";
import { PokemonCard } from "../pokemonCard/PokemonCard";
import { Tooltip } from "../tooltip/Tooltip";
import "react-toastify/dist/ReactToastify.css";
import React, { ReactNode } from "react";
import { singlePokemon } from "../../types";
import { REQUEST_STATUS } from "enums";

interface PokemonListProps {
  pokemonData: singlePokemon[];
  currentPokemonName: string;
  requestStatus: REQUEST_STATUS;
  addToPokedex: (pokemon: singlePokemon) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemonData,
  currentPokemonName,
  requestStatus,
  addToPokedex,
}) => {
  const listToRender =
    currentPokemonName === ""
      ? pokemonData
      : pokemonData.filter((pokemon: singlePokemon) => {
          return pokemon.pokemonName.includes(currentPokemonName);
        });

  const pokemonList = (listToRender || []).map((pokemon: singlePokemon) => {
    return (
      <li className="pokemonList__item" key={pokemon.pokemonName}>
        <Tooltip
          content={
            <div>
              <p>Base experienice: {pokemon.pokemonBaseExperience}</p>
              <p>Height: {pokemon.pokemonHeight}</p>
              <p>Weight: {pokemon.pokemonWeight}</p>
            </div>
          }
        >
          <PokemonCard
            name={pokemon.pokemonName}
            img={pokemon.pokemonImg}
            pokemonTypes={pokemon.pokemonTypes}
            pokemonAbilities={pokemon.pokemonAbilities}
          />
        </Tooltip>
        <button
          className="pokemonList__add"
          onClick={() => {
            addToPokedex(pokemon);
          }}
        >
          Add to Pokedex
        </button>
      </li>
    );
  });

  let pokemonListContent: ReactNode = <p>Wait for pokemons</p>;
  if (requestStatus === REQUEST_STATUS.REJECTED) {
    pokemonListContent = <p>Something went wrong, try to reset the app</p>;
  } else if (requestStatus === REQUEST_STATUS.RESOLVED) {
    pokemonListContent = pokemonList;
  }

  const isPokemonFound =
    listToRender.length === 0 &&
    currentPokemonName !== "" &&
    requestStatus === REQUEST_STATUS.RESOLVED;

  return (
    <main className="pokemonList">
      <ToastContainer
        autoClose={2000}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      {isPokemonFound ? (
        <p className="pokemonList__noFoundInfo">
          No pokemon with this name was found
        </p>
      ) : (
        <ul className="pokemonList__list">{pokemonListContent}</ul>
      )}
    </main>
  );
};
export { PokemonList };
