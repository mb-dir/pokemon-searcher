import "./Pokedex.css";
import { TbPokeball } from "react-icons/tb";
import Toastify from "../toastify/Toastify";
import { useToastify } from "../../hooks/use-toastify";
export default function Pokedex(pokedexData) {
  const [ isToastifyOpen, open, close ] = useToastify();
  const pokemonsInPokedex = pokedexData.pokedexList.map(pokemon => {
    return (
      <li
        className="pokemonList__item pokemonList__item--small"
        key={pokemon.pokemonName}
      >
        <button
          onClick={() => {
            pokedexData.deleteFromPokedex(pokemon);
            open();
            setTimeout(close, 3000);
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

  return (
    <div className="pokedex">
      <Toastify isToastifyOpen={isToastifyOpen} content="Pokemon was deleted" />
      <div className="pokedex__inconContainer">
        <p className="pokedex__info">Your Pokedex</p>
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
        <button onClick={pokedexData.togglePokedex} className="pokedex__close">
          X
        </button>
        <div className="pokedex__content">
          {pokedexData.pokedexList.length === 0 ? (
            <p>Your Pokedex is empty</p>
          ) : (
            pokemonsInPokedex
          )}
        </div>
      </div>
    </div>
  );
}
