import React from "react";
import "./App.css";
import PokemonList from "./components/pokemonList/PokemonList";
import Search from "./components/search/Search";
import Pokedex from "./components/pokedex/Pokedex";

function App() {
  const [ pokemonList, setPokemonList ] = React.useState([]);
  const [ requestStatus, setRequestStatus ] = React.useState("pending");

  const [
    currentTypedPokemonName,
    setCurrentTypedPokemonName,
  ] = React.useState("");

  function updatePokemonName(name) {
    setCurrentTypedPokemonName(name);
  }

  function createPokemonPromise(pokemonUrl) {
    return new Promise((resolve, reject) => {
      fetch(pokemonUrl)
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject.log(err));
    });
  }

  React.useEffect(() => {
    const pokemonsPromisesArray = [];
    const pokemonsProperInfo = [];
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=100")
      .then(res => res.json())
      .then(res => {
        res.results.forEach(el => {
          const pokemonPromise = createPokemonPromise(el.url);
          pokemonsPromisesArray.push(pokemonPromise);
        });
        return pokemonsPromisesArray;
      })
      .then(res => {
        async function fn() {
          for (const pokemon of await Promise.all(res)) {
            const { abilities, name, sprites, types } = pokemon;
            const pokemonObj = {
              pokemonName: name,
              pokemonAbilities: abilities,
              pokemonTypes: types,
              pokemonImg: sprites.front_default,
            };
            pokemonsProperInfo.push(pokemonObj);
          }
          setPokemonList(pokemonsProperInfo);
          setRequestStatus("resovled");
        }
        fn();
      })
      .catch(() => {
        setRequestStatus("rejected");
      });
  }, []);

  const [ isPokedexOpen, setIsPokedexOpen ] = React.useState(false);
  function togglePokedex() {
    setIsPokedexOpen(prev => !prev);
  }
  const [ pokedexList, setPokedexList ] = React.useState(() => {
    return JSON.parse(window.localStorage.getItem("pokedex")) || [];
  });
  function addToPokedex(pokemon) {
    setPokedexList(prevList => {
      const isPokemonAlreadyExist = prevList.some(element => {
        if (element.pokemonName === pokemon.pokemonName) {
          return true;
        }
        return false;
      });
      if (isPokemonAlreadyExist) {
        return [ ...prevList ];
      } else {
        return [ ...prevList, pokemon ];
      }
    });
  }
  function deleteFromPokedex(pokemon) {
    setPokedexList(prevList => {
      return prevList.filter(el => {
        return el.pokemonName !== pokemon.pokemonName;
      });
    });
  }
  React.useEffect(
    () => {
      window.localStorage.setItem("pokedex", JSON.stringify(pokedexList));
    },
    [ pokedexList ]
  );

  return (
    <div className="App">
      <Pokedex
        isPokedexOpen={isPokedexOpen}
        togglePokedex={togglePokedex}
        pokedexList={pokedexList}
        deleteFromPokedex={deleteFromPokedex}
      />
      <Search
        updatePokemonName={updatePokemonName}
        currentPokemonName={currentTypedPokemonName}
      />
      <PokemonList
        pokemonData={pokemonList}
        currentPokemonName={currentTypedPokemonName}
        addToPokedex={addToPokedex}
        requestStatus={requestStatus}
      />
    </div>
  );
}

export default App;
