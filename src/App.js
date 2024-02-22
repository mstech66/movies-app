import "./App.css";
import Counter from "./components/Counter/Counter";
import GenreSelect from "./components/GenreSelect/GenreSelect";
import SearchForm from "./components/SearchForm/SearchForm";

function handleSearch() {
  console.log("Searching...");
}

function handleSelect(e) {
  console.log(e.target.value)
}

const genreList = ["Crime", "Documentary", "Horror", "Comedy"];

function App() {
  return (
    <div className="App">
      <Counter value="1" />
      <SearchForm initValue="Avengers" onSearch={handleSearch} /><br/>
      <GenreSelect genreList={genreList} selectedGenre="Comedy" onSelect={handleSelect} />
    </div>
  );
}

export default App;
