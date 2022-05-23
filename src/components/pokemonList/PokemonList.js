import "./PokemonList.css";

export default pokemonData => {
  //If currentPokemonName is an empty string that means there is nothing typed in the input, so the app should display all pokemons, if it is not an empty string the list of pokemons will be filtered and finally only the maches pokemons will be displayed
  const listToRender =
    pokemonData.currentPokemonName === ""
      ? pokemonData.pokemonData
      : pokemonData.pokemonData.filter(pokemon => {
          return pokemon.name.includes(pokemonData.currentPokemonName);
        });

  const pokemonList = listToRender.map(pokemon => {
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
