import type { MouseEvent } from "react";
import { Card } from "./Card";
import { usePokedex } from "../contexts/PokedexContext";
import type { PokemonDetail } from "../types/api";

interface PokemonCardProps {
  pokemon: PokemonDetail;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const { state, dispatch } = usePokedex();
  const isFavorite = state.favorites.has(pokemon.name);
  const primaryType = pokemon.types[0]?.type.name ?? "normal";

  const sprite =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default ??
    "";

  function handleFavoriteClick(e: MouseEvent): void {
    e.stopPropagation();
    dispatch({ type: "TOGGLE_FAVORITE", payload: pokemon.name });
  }

  return (
    <Card className={`pokemon-card type-${primaryType}`}>
      <button
        className={`favorite-btn ${isFavorite ? "active" : ""}`}
        onClick={handleFavoriteClick}
        aria-label={
          isFavorite ? "Remove from favorites" : "Add to favorites"
        }
      >
        {isFavorite ? "★" : "☆"}
      </button>

      <div className={`sprite-frame ${sprite ? "" : "missing-sprite"}`}>
        {sprite ? (
          <img src={sprite} alt={pokemon.name} className="sprite" />
        ) : (
          <span>No image</span>
        )}
      </div>

      <h3 className="pokemon-name">
        #{pokemon.id.toString().padStart(3, "0")} {pokemon.name}
      </h3>

      <div className="type-badges">
        {pokemon.types.map((t) => (
          <span key={t.slot} className={`type-badge type-${t.type.name}`}>
            {t.type.name}
          </span>
        ))}
      </div>

      <div className="stats">
        <span>HT: {pokemon.height / 10}m</span>
        <span>WT: {pokemon.weight / 10}kg</span>
      </div>
    </Card>
  );
}
