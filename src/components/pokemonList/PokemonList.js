import "./PokemonList.css";

export default pokemonData => {
  //If currentPokemonName is an empty string that means there is nothing typed in the input, so the app should display all pokemons, if it is not an empty string the list of pokemons will be filtered and finally only the maches pokemons will be displayed
  const listToRender =
    pokemonData.currentPokemonName === ""
      ? pokemonData.pokemonData
      : pokemonData.pokemonData.filter(pokemon => {
          return pokemon.pokemonName.includes(pokemonData.currentPokemonName);
        });

  const pokemonList = listToRender.map(pokemon => {
    // Abilities and types are arrays, so rendering it is a little bit crazy
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
      </li>
    );
  });
  return (
    <main className="pokemonList">
      <ul className="pokemonList__list">{pokemonList}</ul>
    </main>
  );
};
