import "./PokemonList.css";

export default function PokemonList(pokemonData) {
  const listToRender =
    pokemonData.currentPokemonName === ""
      ? pokemonData.pokemonData
      : pokemonData.pokemonData.filter(pokemon => {
          return pokemon.pokemonName.includes(pokemonData.currentPokemonName);
        });

  const pokemonList = listToRender.map(pokemon => {
    return (
      <li className="pokemonList__item" key={pokemon.pokemonName}>
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
        <button
          className="pokemonList__add"
          onClick={() => pokemonData.addToPokedex(pokemon)}
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
