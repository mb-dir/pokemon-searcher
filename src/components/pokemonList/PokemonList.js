export default pokemonData => {
  const pokemonList = pokemonData.pokemonData.map(pokemon => {
    return (
      <li key={pokemon.name}>
        <img src={pokemon.url} alt={pokemon.name} />
        <p>{pokemon.name}</p>
      </li>
    );
  });
  return <ul>{pokemonList}</ul>;
};
