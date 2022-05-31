import "./Pokedex.css";
import { TbPokeball } from "react-icons/tb";
export default function Pokedex() {
  return (
    <div className="pokedex">
      <p className="pokedex__info">Your Pokedex</p>
      <TbPokeball className="pokedex__open" />
      <div className="pokedex__body">
        <button className="pokedex__close">X</button>
      </div>
    </div>
  );
}
