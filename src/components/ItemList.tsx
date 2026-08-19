import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { usePokedex } from "../contexts/PokedexContext";
import { PokemonCard } from "./PokemonCard";
import type {
  AsyncState,
  PokemonDetail,
  PokemonListResponse,
} from "../types/api";

const LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000";

export function ItemList() {
  const { state: pokedexState } = usePokedex();
  const listState = useFetch<PokemonListResponse>(LIST_URL);

  const [detailsState, setDetailsState] = useState<
    AsyncState<PokemonDetail[]>
  >({ status: "idle" });

  useEffect(() => {
    if (listState.status !== "success") return;

    let cancelled = false;
    setDetailsState({ status: "loading" });

    Promise.all(
      listState.data.results.map((item) =>
        fetch(item.url).then((res) => {
          if (!res.ok) throw new Error(`Failed to load ${item.name}`);
          return res.json() as Promise<PokemonDetail>;
        })
      )
    )
      .then((details) => {
        if (!cancelled) setDetailsState({ status: "success", data: details });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Unknown error";
        setDetailsState({ status: "error", error: message });
      });

    return () => {
      cancelled = true;
    };
  }, [listState]);

  if (listState.status === "loading" || detailsState.status === "loading") {
    return <p className="status-message">Loading Pokémon...</p>;
  }

  if (listState.status === "error") {
    return <p className="status-message error">Error: {listState.error}</p>;
  }

  if (detailsState.status === "error") {
    return (
      <p className="status-message error">Error: {detailsState.error}</p>
    );
  }

  if (detailsState.status !== "success") {
    return null;
  }

  const filtered = detailsState.data.filter((p) =>
    p.name.toLowerCase().includes(pokedexState.searchTerm.toLowerCase())
  );

  if (filtered.length === 0) {
    return <p className="status-message">No Pokémon match your search.</p>;
  }

  return (
    <div className="item-grid">
      {filtered.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
