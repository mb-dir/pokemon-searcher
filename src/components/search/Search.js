import "./Search.css";
export default function Search() {
  return (
    <form className="searcher">
      <label htmlFor="search" className="searcher__description">
        Wpisz nazwe pokemona
      </label>
      <input className="search__input" type="text" id="search" />
    </form>
  );
}
