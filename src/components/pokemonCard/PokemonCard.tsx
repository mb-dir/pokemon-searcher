import { pokemonTypes, pokemonAbilities } from "types";
import "./PokemonCard.css";
import React from "react";

interface PokemonCardProps {
  name: string;
  img: string;
  pokemonTypes: pokemonTypes[];
  pokemonAbilities: pokemonAbilities[];
  className?: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  img,
  pokemonTypes,
  pokemonAbilities,
  className = "",
}) => {
  return (
    <div className={`pokemonCard ${className}`}>
      <img className="pokemonCard__pokemonImg" src={img} alt={name} />
      <p className="pokemonCard__name">{name}</p>
      <p className="pokemonCard__type">
        {(pokemonTypes || []).map(el => {
          return <span key={el.type.name}>{`${el.type.name} `}</span>;
        })}
      </p>
      <p className="pokemonCard__ability">
        abilities:{" "}
        {(pokemonAbilities || []).map(el => {
          return <span key={el.ability.name}>{`${el.ability.name} `}</span>;
        })}
      </p>
    </div>
  );
};

export { PokemonCard };
