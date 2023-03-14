import React from "react";
import "./Search.css";

interface SearchProps {
  updatePokemonName: (value: string) => void;
  currentPokemonName: string;
}

const Search: React.FC<SearchProps> = ({
  updatePokemonName,
  currentPokemonName,
}) => {
  return (
    <form className="searcher">
      <label htmlFor="search" className="searcher__description">
        Wpisz nazwe pokemona
      </label>
      <input
        value={currentPokemonName}
        onChange={({ target }) => {
          updatePokemonName(target.value);
        }}
        className="search__input"
        type="text"
        id="search"
      />
    </form>
  );
};
export { Search };
