import "./Pokedex.css";
import { TbPokeball } from "react-icons/tb";
import { toast } from "react-toastify";
import { PokemonCard } from "../pokemonCard/PokemonCard";
import "react-toastify/dist/ReactToastify.css";

const Pokedex = ({
  togglePokedex,
  isPokedexOpen,
  pokedexList,
  deleteFromPokedex,
}) => {
  const pokemonsInPokedex = (pokedexList || []).map(pokemon => {
    return (
      <li
        className="pokemonList__item pokemonList__item--small"
        key={pokemon.pokemonName}
      >
        <button
          onClick={() => {
            deleteFromPokedex(pokemon);
            toast.info(`${pokemon.pokemonName} was deleted`);
          }}
          className="pokemonList__deleteFromPokedex"
        >
          x
        </button>
        <PokemonCard
          className="pokemonCard--small"
          name={pokemon.pokemonName}
          img={pokemon.pokemonImg}
          pokemonTypes={pokemon.pokemonTypes}
          pokemonAbilities={pokemon.pokemonAbilities}
        />
      </li>
    );
  });

  return (
    <div className="pokedex">
      <div className="pokedex__inconContainer">
        <p className="pokedex__info">Your Pokedex</p>
        <TbPokeball onClick={togglePokedex} className="pokedex__open" />
      </div>
      <div
        className={`pokedex__body ${isPokedexOpen
          ? "pokedex__body--open"
          : ""}`}
      >
        <button onClick={togglePokedex} className="pokedex__close">
          X
        </button>
        <div className="pokedex__content">
          {pokedexList.length === 0 ? (
            <p>Your Pokedex is empty</p>
          ) : (
            pokemonsInPokedex
          )}
        </div>
      </div>
    </div>
  );
};

export { Pokedex };
