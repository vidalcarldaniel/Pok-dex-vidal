import type { ChangeEvent } from "react";
import { usePokedex } from "../contexts/PokedexContext";

export function SearchBar() {
  const { state, dispatch } = usePokedex();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Pokémon by name..."
        value={state.searchTerm}
        onChange={handleChange}
        aria-label="Search Pokémon"
      />
    </div>
  );
}
