import { useState } from "react";
import "./App.css";
import { PokemonList } from "./components/pokemonList/PokemonList";
import { Search } from "./components/search/Search";
import { Pokedex } from "./components/pokedex/Pokedex";
import { usePokemonList } from "./hooks/use-pokemon-list";
import { usePokedex } from "./hooks/use-pokedex";

function App() {
  const [ currentTypedPokemonName, setCurrentTypedPokemonName ] = useState("");
  const { pokemonList, requestStatus } = usePokemonList();
  const { pokedexList, deleteFromPokedex, addToPokedex } = usePokedex();

  function updatePokemonName(name) {
    setCurrentTypedPokemonName(name);
  }

  const [ isPokedexOpen, setIsPokedexOpen ] = useState(false);
  function togglePokedex() {
    setIsPokedexOpen(prev => !prev);
  }

  return (
    <div className="App">
      <Pokedex
        isPokedexOpen={isPokedexOpen}
        togglePokedex={togglePokedex}
        deleteFromPokedex={deleteFromPokedex}
        pokedexList={pokedexList}
      />
      <Search
        updatePokemonName={updatePokemonName}
        currentPokemonName={currentTypedPokemonName}
      />
      <PokemonList
        pokemonData={pokemonList}
        currentPokemonName={currentTypedPokemonName}
        requestStatus={requestStatus}
        addToPokedex={addToPokedex}
      />
    </div>
  );
}

export default App;
