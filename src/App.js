import "./App.css";
import Counter from "./components/Counter/Counter";
import GenreSelect from "./components/GenreSelect/GenreSelect";
import MovieTile from "./components/MovieTile/MovieTile";
import SearchForm from "./components/SearchForm/SearchForm";
import { movieList } from "./data/MoviesList";


function handleSearch(value) {
  console.log("Searching for", value);
}

function handleSelect(value) {
  console.log(value);
}

const genreList = ["Crime", "Documentary", "Horror", "Comedy"];

function App() {
  return (
    <div className="App">
      <Counter value="1" />
      <SearchForm initValue="Avengers" onSearch={handleSearch} />
      <br />
      <GenreSelect
        genreList={genreList}
        selectedGenre="Comedy"
        onSelect={handleSelect}
      />
      <div className="movieFlex">
        {movieList.map((movie) => {
          return <MovieTile {...movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
}

export default App;
