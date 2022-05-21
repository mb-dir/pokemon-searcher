import "./PokemonList.css";

export default pokemonData => {
  const pokemonList = pokemonData.pokemonData.map(pokemon => {
    return (
      <li className="pokemonList__item" key={pokemon.name}>
        <img
          className="pokemonList__pokemonImg"
          src={pokemon.url}
          alt={pokemon.name}
        />
        <p className="pokemonList__name">{pokemon.name}</p>
      </li>
    );
  });
  return (
    <main className="pokemonList">
      <ul className="pokemonList__list">{pokemonList}</ul>
    </main>
  );
};
