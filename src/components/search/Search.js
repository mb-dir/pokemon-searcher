import "./Search.css";
const Search = ({ updatePokemonName, currentPokemonName }) => {
  //Each input change causes state update in App
  function updateName({ target }) {
    updatePokemonName(target.value);
  }
  return (
    <form className="searcher">
      <label htmlFor="search" className="searcher__description">
        Wpisz nazwe pokemona
      </label>
      <input
        value={currentPokemonName}
        onChange={updateName}
        className="search__input"
        type="text"
        id="search"
      />
    </form>
  );
};
export { Search };
