import "./Pokedex.css";
import { TbPokeball } from "react-icons/tb";
export default function Pokedex(pokedexData) {
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
      </div>
    </div>
  );
}
