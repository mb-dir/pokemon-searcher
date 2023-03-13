export type singlePokemon = {
  pokemonName: string;
  pokemonAbilities: pokemonAbilities[];
  pokemonTypes: pokemonTypes[];
  pokemonImg: string;
  pokemonBaseExperience: string;
  pokemonHeight: string;
  pokemonWeight: string;
};

export type pokemonTypes = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type pokemonAbilities = {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
};

export type pokemonPromise = {
  name: string;
  url: string;
};
