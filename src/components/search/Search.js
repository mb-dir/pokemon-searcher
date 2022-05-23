import "./Search.css";
export default function Search(props) {
  //Each input change causes state update in App
  function updateName({ target }) {
    props.updatePokemonName(target.value);
  }
  return (
    <form className="searcher">
      <label htmlFor="search" className="searcher__description">
        Wpisz nazwe pokemona
      </label>
      <input
        value={props.currentPokemonName}
        onChange={updateName}
        className="search__input"
        type="text"
        id="search"
      />
    </form>
  );
}
