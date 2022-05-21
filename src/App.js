import React from "react";
import "./App.css";
import data from "./pokemonData";
import PokemonList from "./components/pokemonList/PokemonList";
import Search from "./components/search/Search";

function App() {
  const [ pokemonList, setPokemonList ] = React.useState(data);
  return (
    <div className="App">
      <Search />
      <PokemonList pokemonData={pokemonList} />
    </div>
  );
}

export default App;
