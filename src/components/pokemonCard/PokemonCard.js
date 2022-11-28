import "./PokemonCard.css";

export default function PokemonCard({
  name,
  img,
  pokemonTypes,
  pokemonAbilities,
  className = "",
}) {
  return (
    <div className={`pokemonCard ${className}`}>
      <img className="pokemonCard__pokemonImg" src={img} alt={name} />
      <p className="pokemonCard__name">{name}</p>
      <p className="pokemonCard__type">
        {pokemonTypes.map(el => {
          return <span key={el.type.name}>{`${el.type.name} `}</span>;
        })}
      </p>
      <p className="pokemonCard__ability">
        abilities:{" "}
        {pokemonAbilities.map(el => {
          return <span key={el.ability.name}>{`${el.ability.name} `}</span>;
        })}
      </p>
    </div>
  );
}
