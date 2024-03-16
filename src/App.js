import { useEffect, useState } from "react";
import "./App.css";
import Counter from "./components/Counter/Counter";
import GenreSelect from "./components/GenreSelect/GenreSelect";
import MovieTile from "./components/MovieTile/MovieTile";
import SearchForm from "./components/SearchForm/SearchForm";
import { movieList } from "./data/MoviesList";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import { findObjectById, sortByProperty } from "./helpers/Helpers";
import SortControl from "./components/SortControl/SortControl";

function handleSearch(value) {
  console.log("Searching for", value);
}

function handleSelect(value) {
  console.log(value);
}

const genreList = ["Crime", "Documentary", "Horror", "Comedy"];

function App() {
  const [movieDetail, setMovieDetail] = useState(null);
  const [sortBy, setSortBy] = useState("releaseYear");
  const [movies, setMovies] = useState(sortByProperty(movieList, sortBy));

  const handleMovieCardClick = async (value) => {
    await findObjectById(movieList, value).then((res) => {
      console.log(res);
      setMovieDetail(res);
    });
  };

  const handleSort = (value) => {
    console.log('Sorting by', value);
    setSortBy(value);
  }

  useEffect(()=> {
    console.log("SortBy is", sortBy, "Movies are", sortByProperty(movies, sortBy))
    setMovies(sortByProperty(movies, sortBy));
  }, [sortBy, movies]);

  return (
    <div className="App">
      {movieDetail !== null ? (
        <MovieDetails {...movieDetail} />
      ) : (
        <>
          <Counter value="1" />
          <SearchForm initValue="Avengers" onSearch={handleSearch} />
          <br />
          <GenreSelect
            genreList={genreList}
            selectedGenre="Comedy"
            onSelect={handleSelect}
          />
        </>
      )}<br/>
      <SortControl defaultValue={sortBy} handleChange={handleSort}/>
      <div className="movieFlex">
        {movies.map((movie) => {
          return (
            <MovieTile
              {...movie}
              key={movie.id}
              handleClick={async () => await handleMovieCardClick(movie.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
