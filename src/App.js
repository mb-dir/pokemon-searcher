import React from "react";
import "./App.css";
import data from "./pokemonData";

function App() {
  const [ pokemonList, setPokemonList ] = React.useState(data);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello</h1>
      </header>
    </div>
  );
}

export default App;
