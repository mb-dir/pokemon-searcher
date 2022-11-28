import "./PokemonList.css";
import Toastify from "../toastify/Toastify";
import { useToastify } from "../../hooks/use-toastify";
import PokemonCard from "../pokemonCard/PokemonCard";

export default function PokemonList(pokemonData) {
  const [ isToastifyOpen, open, close ] = useToastify();

  const listToRender =
    pokemonData.currentPokemonName === ""
      ? pokemonData.pokemonData
      : pokemonData.pokemonData.filter(pokemon => {
          return pokemon.pokemonName.includes(pokemonData.currentPokemonName);
        });

  const pokemonList = listToRender.map(pokemon => {
    console.log(pokemon);
    return (
      <li className="pokemonList__item" key={pokemon.pokemonName}>
        <PokemonCard
          name={pokemon.pokemonName}
          img={pokemon.pokemonImg}
          pokemonTypes={pokemon.pokemonTypes}
          pokemonAbilities={pokemon.pokemonAbilities}
        />
        <button
          className="pokemonList__add"
          onClick={() => {
            pokemonData.addToPokedex(pokemon);
            open();
            setTimeout(close, 3000);
          }}
        >
          Add to Pokedex
        </button>
      </li>
    );
  });

  let pokemonListContent = <p>Wait for pokemons</p>;
  if (pokemonData.requestStatus === "rejected") {
    pokemonListContent = <p>Something went wrong, try to reset the app</p>;
  } else if (pokemonData.requestStatus === "resovled") {
    pokemonListContent = pokemonList;
  }

  return (
    <main className="pokemonList">
      <Toastify isToastifyOpen={isToastifyOpen} content="Pokemon was added" />
      {listToRender.length === 0 &&
      pokemonData.currentPokemonName !== "" &&
      pokemonData.requestStatus === "resovled" ? (
        <p className="pokemonList__noFoundInfo">
          No pokemon with this name was found
        </p>
      ) : (
        <ul className="pokemonList__list">{pokemonListContent}</ul>
      )}
    </main>
  );
}
