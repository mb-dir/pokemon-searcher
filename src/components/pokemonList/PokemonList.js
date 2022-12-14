import "./PokemonList.css";
import { ToastContainer, toast } from "react-toastify";
import { PokemonCard } from "../pokemonCard/PokemonCard";
import { Tooltip } from "../tooltip/Tooltip";
import { usePokedex } from "../../hooks/use-pokedex";
import "react-toastify/dist/ReactToastify.css";

const PokemonList = ({ pokemonData, currentPokemonName, requestStatus }) => {
  const { addToPokedex } = usePokedex();
  const listToRender =
    currentPokemonName === ""
      ? pokemonData
      : pokemonData.filter(pokemon => {
          return pokemon.pokemonName.includes(currentPokemonName);
        });

  const pokemonList = listToRender.map(pokemon => {
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
            toast.info(`${pokemon.pokemonName} was added`);
          }}
        >
          Add to Pokedex
        </button>
      </li>
    );
  });

  let pokemonListContent = <p>Wait for pokemons</p>;
  if (requestStatus === "rejected") {
    pokemonListContent = <p>Something went wrong, try to reset the app</p>;
  } else if (requestStatus === "resovled") {
    pokemonListContent = pokemonList;
  }

  return (
    <main className="pokemonList">
      <ToastContainer
        autoClose={2000}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      {listToRender.length === 0 &&
      currentPokemonName !== "" &&
      requestStatus === "resovled" ? (
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
