import { useEffect, useState } from "react";
import "./App.css";
import Counter from "./components/Counter/Counter";
import GenreSelect from "./components/GenreSelect/GenreSelect";
import MovieTile from "./components/MovieTile/MovieTile";
import SearchForm from "./components/SearchForm/SearchForm";
import { movieList, genreList } from "./data/MoviesList";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import { findObjectById, sortByProperty } from "./helpers/Helpers";
import SortControl from "./components/SortControl/SortControl";
import Dialog from "./components/Dialog/Dialog";
import MovieForm from "./components/MovieForm/MovieForm";
import DeleteMovie from "./components/DeleteMovie/DeleteMovie";

function handleSearch(value) {
  console.log("Searching for", value);
}

function handleSelect(value) {
  console.log(value);
}

function App() {
  const [movieDetail, setMovieDetail] = useState(null);
  const [sortBy, setSortBy] = useState("releaseDate");
  const [movies, setMovies] = useState(sortByProperty(movieList, sortBy));
  const [currentMovie, setCurrentMovie] = useState(null);
  const [currentDialog, setCurrentDialog] = useState(null);

  const handleMovieCardClick = async (value) => {
    await findObjectById(movieList, value).then((res) => {
      setMovieDetail(res);
    });
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  const handleClose = () => {
    setCurrentDialog(null);
  };

  const handleSubmit = (value) => {
    setCurrentDialog(null);
    console.log("Adding movie", value);
  };

  const handleEdit = async (id) => {
    await findObjectById(movieList, id).then((res) => {
      setCurrentMovie(res);
      setCurrentDialog("edit");
    });
    console.log("Editing for", currentMovie);
  };

  const handleDelete = async (id) => {
    await findObjectById(movieList, id).then((res) => {
      setCurrentMovie(res);
      setCurrentDialog("delete");
    });
    console.log("Deleting for", currentMovie);
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
              setCurrentDialog("add");
            }}
          >
            Add Movie
          </button>
          {currentDialog === "add" && (
            <Dialog title={"Add Movie"} onClose={handleClose}>
              <MovieForm onSubmit={handleSubmit} />
            </Dialog>
          )}
          {currentDialog === "edit" && (
            <Dialog title={"Edit Movie"} onClose={handleClose}>
              <MovieForm movie={currentMovie} onSubmit={handleSubmit} />
            </Dialog>
          )}
          {currentDialog === "delete" && (
            <Dialog title={"Delete Movie"} onClose={handleClose}>
              <DeleteMovie id={currentMovie.id} onDelete={handleDelete} />
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
              onDelete={async () => await handleDelete(movie.id)}
              handleClick={async () => await handleMovieCardClick(movie.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
