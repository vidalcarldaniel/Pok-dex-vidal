import { PokedexProvider } from "./contexts/PokedexContext";
import { SearchBar } from "./components/SearchBar";
import { ItemList } from "./components/ItemList";
import pokeballLogo from "./assets/pokeball.svg";
import "./App.css";

function App() {
  return (
    <PokedexProvider>
      <div className="app">
        <header className="app-header">
          <div className="brand-wrap">
            <img className="brand-logo" src={pokeballLogo} alt="Poké Ball" />
            <div>
              <h1>Pokédex</h1>
              <p className="subtitle">Powered by PokéAPI</p>
            </div>
          </div>
          <SearchBar />
        </header>
        <main>
          <ItemList />
        </main>
      </div>
    </PokedexProvider>
  );
}

export default App;
