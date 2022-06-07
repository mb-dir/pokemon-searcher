import "./Pokedex.css";
import { TbPokeball } from "react-icons/tb";
export default function Pokedex(pokedexData) {
  let pokemonsInPokedex;
  if (pokedexData.pokedexList.length > 0) {
    pokemonsInPokedex = pokedexData.pokedexList.map(pokemon => {
      //The structure is simillar to structure of item in PokemonList, so it wouldn't be a silly idea to create a separate component for this list so as not to duplicate the code
      return (
        <li
          className="pokemonList__item pokemonList__item--small"
          key={pokemon.pokemonName}
        >
          <button
            onClick={() => {
              pokedexData.deleteFromPokedex(pokemon);
            }}
            className="pokemonList__deleteFromPokedex"
          >
            x
          </button>
          <img
            className="pokemonList__pokemonImg"
            src={pokemon.pokemonImg}
            alt={pokemon.pokemonName}
          />
          <p className="pokemonList__name">{pokemon.pokemonName}</p>
          <p className="pokemonList__type">
            {pokemon.pokemonTypes.map(el => {
              return <span key={el.type.name}>{`${el.type.name} `}</span>;
            })}
          </p>
          <p className="pokemonList__ability">
            abilities:{" "}
            {pokemon.pokemonAbilities.map(el => {
              return <span key={el.ability.name}>{`${el.ability.name} `}</span>;
            })}
          </p>
        </li>
      );
    });
  }

  return (
    <div className="pokedex">
      <div className="pokedex__inconContainer">
        <p className="pokedex__info">Your Pokedex</p>
        {/* User can open/close pokedex using this btn */}
        <TbPokeball
          onClick={pokedexData.togglePokedex}
          className="pokedex__open"
        />
      </div>
      <div
        className={`pokedex__body ${pokedexData.isPokedexOpen
          ? "pokedex__body--open"
          : ""}`}
      >
        {/* User can close pokedex using this btn */}
        <button onClick={pokedexData.togglePokedex} className="pokedex__close">
          X
        </button>
        <div className="pokedex__content">{pokemonsInPokedex}</div>
      </div>
    </div>
  );
}
