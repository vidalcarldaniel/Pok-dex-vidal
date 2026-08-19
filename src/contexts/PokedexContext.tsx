import { createContext, useContext, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";

interface PokedexState {
  searchTerm: string;
  favorites: Set<string>;
}

type PokedexAction =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "TOGGLE_FAVORITE"; payload: string };

const initialState: PokedexState = {
  searchTerm: "",
  favorites: new Set<string>(),
};

function pokedexReducer(
  state: PokedexState,
  action: PokedexAction
): PokedexState {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "TOGGLE_FAVORITE": {
      const next = new Set(state.favorites);
      if (next.has(action.payload)) {
        next.delete(action.payload);
      } else {
        next.add(action.payload);
      }
      return { ...state, favorites: next };
    }
    default:
      return state;
  }
}

interface PokedexContextValue {
  state: PokedexState;
  dispatch: Dispatch<PokedexAction>;
}

const PokedexContext = createContext<PokedexContextValue | undefined>(
  undefined
);

export function PokedexProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(pokedexReducer, initialState);

  return (
    <PokedexContext.Provider value={{ state, dispatch }}>
      {children}
    </PokedexContext.Provider>
  );
}

export function usePokedex(): PokedexContextValue {
  const ctx = useContext(PokedexContext);
  if (!ctx) {
    throw new Error("usePokedex must be used within a PokedexProvider");
  }
  return ctx;
}
