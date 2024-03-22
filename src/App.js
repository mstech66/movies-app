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
import Dialog from "./components/Dialog/Dialog";
import MovieForm from "./components/MovieForm/MovieForm";

function handleSearch(value) {
  console.log("Searching for", value);
}

function handleSelect(value) {
  console.log(value);
}

const genreList = ["Crime", "Documentary", "Horror", "Comedy"];

function App() {
  const [movieDetail, setMovieDetail] = useState(null);
  const [sortBy, setSortBy] = useState("releaseDate");
  const [movies, setMovies] = useState(sortByProperty(movieList, sortBy));
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMovieCardClick = async (value) => {
    await findObjectById(movieList, value).then((res) => {
      setMovieDetail(res);
    });
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  const handleClose = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleSubmit = (value) => {
    setIsDialogOpen(!isDialogOpen);
    console.log(value);
  };

  const handleEdit = async(id) => {
    await findObjectById(movieList, id).then((res) => {
      setMovieDetail(res);
      setIsDialogOpen(true);
    });
  };

  useEffect(() => {
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
          <br />
          <button
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            Add Movie
          </button>
          {isDialogOpen && (
            <Dialog title={"Add Movie"} onClose={handleClose}>
              <MovieForm movie={movieDetail} onSubmit={handleSubmit} />
            </Dialog>
          )}
        </>
      )}
      <br />
      <SortControl defaultValue={sortBy} handleChange={handleSort} />
      <div className="movieFlex">
        {movies.map((movie) => {
          return (
            <MovieTile
              {...movie}
              key={movie.id}
              onEdit={async () => await handleEdit(movie.id)}
              handleClick={async () => await handleMovieCardClick(movie.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
