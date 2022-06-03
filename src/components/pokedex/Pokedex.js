import "./Pokedex.css";
import { TbPokeball } from "react-icons/tb";
export default function Pokedex(pokedexData) {
  let pokemonsInPokedex;
  if (pokedexData.pokedexList.length > 0) {
    pokemonsInPokedex = pokedexData.pokedexList.map(pokemon => {
      return <p>{pokemon.pokemonName}</p>;
    });
  }

  return (
    <div className="pokedex">
      <p className="pokedex__info">Your Pokedex</p>
      {/* User can open/close pokedex using this btn */}
      <TbPokeball
        onClick={pokedexData.togglePokedex}
        className="pokedex__open"
      />
      <div
        className={`pokedex__body ${pokedexData.isPokedexOpen
          ? "pokedex__body--open"
          : ""}`}
      >
        {/* User can close pokedex using this btn */}
        <button onClick={pokedexData.togglePokedex} className="pokedex__close">
          X
        </button>
        {pokemonsInPokedex}
      </div>
    </div>
  );
}
