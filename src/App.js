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

  return (
    <div className="App">
      <Pokedex
        deleteFromPokedex={deleteFromPokedex}
        pokedexList={pokedexList}
      />
      <Search
        updatePokemonName={name => setCurrentTypedPokemonName(name)}
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
