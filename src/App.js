import React from "react";
import "./App.css";
import PokemonList from "./components/pokemonList/PokemonList";
import Search from "./components/search/Search";

function App() {
  const [ pokemonList, setPokemonList ] = React.useState([]);

  //This state + function are passed to Search component - Search component updates the currentTypedPokemonName, and based on this in PokemonList the pokemonList is filtered and finally we see only pokemons which match to the typed name
  const [
    currentTypedPokemonName,
    setCurrentTypedPokemonName,
  ] = React.useState("");

  function updatePokemonName(name) {
    setCurrentTypedPokemonName(name);
  }

  return (
    <div className="App">
      <Search
        updatePokemonName={updatePokemonName}
        currentPokemonName={currentTypedPokemonName}
      />
      <PokemonList
        pokemonData={pokemonList}
        currentPokemonName={currentTypedPokemonName}
      />
    </div>
  );
}

export default App;
