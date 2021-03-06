import React from "react";
import "./App.css";
import PokemonList from "./components/pokemonList/PokemonList";
import Search from "./components/search/Search";
import Pokedex from "./components/pokedex/Pokedex";

function App() {
  const [ pokemonList, setPokemonList ] = React.useState([]);
  //Determine request status - based on this user will see the info if the pokemons are fetching/if something goes wrong or if everything is fine user will see the pokemonList
  const [ requestStatus, setRequestStatus ] = React.useState("pending");

  //This state + function are passed to Search component - Search component updates the currentTypedPokemonName, and based on this in PokemonList the pokemonList is filtered and finally we see only pokemons which match to the typed name
  const [
    currentTypedPokemonName,
    setCurrentTypedPokemonName,
  ] = React.useState("");

  function updatePokemonName(name) {
    setCurrentTypedPokemonName(name);
  }

  //Auxiliary function related with data fetching - fetch("https://pokeapi.co/api/v2/pokemon/?limit=100") returns something like that: [{name: "bulbasaur"}, url: "https://pokeapi.co/api/v2/pokemon/1/"] so in order to get more details about the pokemon I have to do another request to above url. I decided to keep it in the array of promises(and later use Promise.all on it), below function creates Promise object - each Promise object will be pushed to special array
  function createPokemonPromise(pokemonUrl) {
    return new Promise((resolve, reject) => {
      fetch(pokemonUrl)
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject.log(err));
    });
  }

  //Get data from API
  React.useEffect(() => {
    const pokemonsPromisesArray = [];
    const pokemonsProperInfo = [];
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=100")
      .then(res => res.json())
      .then(res => {
        res.results.forEach(el => {
          //Gets each url, create Promise based on it, and push it to special array
          const pokemonPromise = createPokemonPromise(el.url);
          pokemonsPromisesArray.push(pokemonPromise);
        });
        return pokemonsPromisesArray;
      })
      .then(res => {
        //Async loop
        async function fn() {
          for (const pokemon of await Promise.all(res)) {
            //From each promise gets the proper data
            const { abilities, name, sprites, types } = pokemon;
            //Create special object with those data
            const pokemonObj = {
              pokemonName: name,
              pokemonAbilities: abilities,
              pokemonTypes: types,
              pokemonImg: sprites.front_default,
            };
            //Push it to special array
            pokemonsProperInfo.push(pokemonObj);
          }
          //Set it as a state - now when we pass this state to PokemonList we pass only the proper data
          setPokemonList(pokemonsProperInfo);
          setRequestStatus("resovled");
        }
        fn();
      })
      .catch(() => {
        setRequestStatus("rejected");
      });
  }, []);

  //Pokedex related state

  //Determines if Pokedex is open
  const [ isPokedexOpen, setIsPokedexOpen ] = React.useState(false);
  function togglePokedex() {
    setIsPokedexOpen(prev => !prev);
  }
  //This list of pokemons is passed to Pokedex component, and based on it content of Pokdex is rendered
  const [ pokedexList, setPokedexList ] = React.useState(() => {
    return JSON.parse(window.localStorage.getItem("pokedex")) || [];
  });
  function addToPokedex(pokemon) {
    setPokedexList(prevList => {
      //Auxiliary function for determinating if the element(pokemon) already exists in our state
      //Based on: https://bobbyhadz.com/blog/javascript-check-if-array-contains-object
      const isPokemonAlreadyExist = prevList.some(element => {
        if (element.pokemonName === pokemon.pokemonName) {
          return true;
        }
        return false;
      });
      //If the pokemon is already added to Pokedex do not add it again
      if (isPokemonAlreadyExist) {
        return [ ...prevList ];
      } else {
        return [ ...prevList, pokemon ];
      }
    });
  }
  //This function is passed as a prop to Pokedex where is used in onClick event on btn which delete the pokemon form Pokedex
  function deleteFromPokedex(pokemon) {
    setPokedexList(prevList => {
      return prevList.filter(el => {
        return el.pokemonName !== pokemon.pokemonName;
      });
    });
  }
  //Each time when pokedexList is changed update the pokedex value in localStorage - thanks to this data in storage is up to date with app state
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
