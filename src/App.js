import { useState } from "react";
import "./App.css";
import { PokemonList } from "./components/pokemonList/PokemonList";
import { Search } from "./components/search/Search";
import { Pokedex } from "./components/pokedex/Pokedex";
import { usePokemonList } from "./hooks/use-pokemon-list";

function App() {
  const [ currentTypedPokemonName, setCurrentTypedPokemonName ] = useState("");
  const { pokemonList, requestStatus } = usePokemonList();

  function updatePokemonName(name) {
    setCurrentTypedPokemonName(name);
  }

  const [ isPokedexOpen, setIsPokedexOpen ] = useState(false);
  function togglePokedex() {
    setIsPokedexOpen(prev => !prev);
  }

  return (
    <div className="App">
      <Pokedex isPokedexOpen={isPokedexOpen} togglePokedex={togglePokedex} />
      <Search
        updatePokemonName={updatePokemonName}
        currentPokemonName={currentTypedPokemonName}
      />
      <PokemonList
        pokemonData={pokemonList}
        currentPokemonName={currentTypedPokemonName}
        requestStatus={requestStatus}
      />
    </div>
  );
}

export default App;
