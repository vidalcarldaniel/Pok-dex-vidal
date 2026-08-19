# Pokédex SPA

A single-page application built with **Vite + TypeScript + React** that
fetches Pokémon data from the [PokéAPI](https://pokeapi.co) and displays
it with typed components, a generic custom hook, and shared state via
`useReducer` + `useContext`.

## Features

- Search/filter Pokémon by name
- Favorite/unfavorite Pokémon (shared state via context + reducer)
- Loading / error / success states for all async data
- Responsive card grid layout

## Tech Stack

- **Vite** — bundler & dev server
- **TypeScript** (strict mode) — no `any` types anywhere
- **React 18** — functional components + hooks
- **PokéAPI** — https://pokeapi.co/api/v2/pokemon

## Project Structure

```
src/
├── components/
│   ├── Card.tsx
│   ├── ItemList.tsx
│   ├── PokemonCard.tsx
│   └── SearchBar.tsx
├── hooks/
│   └── useFetch.ts
├── contexts/
│   └── PokedexContext.tsx
├── types/
│   └── api.ts
├── App.tsx
├── App.css
└── main.tsx
```

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

### Type-check

```bash
npx tsc --noEmit
```

### Production build

```bash
npm run build
```

## API Source

All data comes from the free, unlimited [PokéAPI](https://pokeapi.co/api/v2/pokemon?limit=20)
endpoint — no API key required.

## Notes on Type Safety

- `strict: true` is enabled in `tsconfig.app.json`.
- Async state (loading/error/success) is modeled as a **discriminated
  union** (`AsyncState<T>` in `types/api.ts`), so consuming components
  narrow the type safely via the `status` field instead of relying on
  optional/nullable fields.
- `useFetch<T>` is a fully generic hook — it can fetch and type any
  JSON endpoint, not just PokéAPI responses.

## Possible Next Steps

- Pagination / "load more" for browsing beyond the first 20 Pokémon
- Detail modal on card click (stats radar chart, abilities, evolution chain)
- Persist favorites to `localStorage`
- Light/dark theme toggle
