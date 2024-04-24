import React, { useEffect, useState } from "react";
import styles from "./MovieListPage.module.css";
import { fetchMovies, findObjectById } from "../../helpers/Helpers";
import MovieTile from "../MovieTile/MovieTile";
import SearchForm from "../SearchForm/SearchForm";
import MovieDetails from "../MovieDetails/MovieDetails";
import Dialog from "../Dialog/Dialog";
import MovieForm from "../MovieForm/MovieForm";
import DeleteMovie from "../DeleteMovie/DeleteMovie";
import SortControl from "../SortControl/SortControl";
import GenreSelect from "../GenreSelect/GenreSelect";
import { FaSearch } from "react-icons/fa";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const genreList = ["All", "Documentary", "Comedy", "Horror", "Crime"];

export default function MovieListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "release_date"
  );
  const [activeGenre, setActiveGenre] = useState(
    searchParams.get("genre") || "All"
  );
  const { movies: initialMovies } = useLoaderData();
  const [movies, setMovies] = useState(initialMovies);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [currentDialog, setCurrentDialog] = useState(null);
  const navigate = useNavigate();
  const { movieId } = useParams();

  function handleSearch(value) {
    let params = new URLSearchParams(searchParams.toString());
    value ? params.set("query", value) : params.delete("query");
    setSearchParams(params);
    setSearchQuery(value);
    navigate(`?${params.toString()}`);
  }

  const handleMovieCardClick = async (id) => {
    setSelectedMovie(id);
    navigate(`/${id}`);
  };

  const handleClear = () => {
    setActiveGenre("All")
    setSortBy("release_date")
    setSearchQuery("")
    navigate(`/`);
  };

  const handleSort = (value) => {
    let params = new URLSearchParams(searchParams.toString());
    value ? params.set("sortBy", value) : params.delete("sortBy");
    setSearchParams(params);
    setSortBy(value);
    navigate(`?${params.toString()}`);
  };

  const handleSelect = (value) => {
    let params = new URLSearchParams(searchParams.toString());
    value ? params.set("genre", value) : params.delete("genre");
    setSearchParams(params);
    setActiveGenre(value);
    navigate(`?${params.toString()}`);
  };

  const handleClose = () => {
    setCurrentDialog(null);
  };

  const handleSubmit = (value) => {
    setCurrentDialog(null);
    console.log("Adding movie", value);
  };

  const handleEdit = async (id) => {
    await findObjectById(movies, id).then((res) => {
      setCurrentMovie(res);
      setCurrentDialog("edit");
    });
    console.log("Editing for", currentMovie);
  };

  const handleDelete = async (id) => {
    await findObjectById(movies, id).then((res) => {
      setCurrentMovie(res);
      setCurrentDialog("delete");
    });
    console.log("Deleting for", currentMovie);
  };

  const onMovieDelete = async (id) => {
    console.log("Deleting finally for", id);
    //todo: delete logic
    setCurrentDialog(null);
  };

  useEffect(() => {
    const fetchNewMovies = async () => {
      const fetchedMovies = await fetchMovies(sortBy, activeGenre, searchQuery);
      setMovies(fetchedMovies);
    };

    fetchNewMovies();
  }, [sortBy, searchQuery, activeGenre]);

  useEffect(() => {
    if (movieId) {
      setSelectedMovie(movieId);
    }
  }, [movieId]);

  return (
    <>
      <div className={styles.navBar}>
        <button
          className={styles.appNameTitle}
          onClick={() => {
            setSelectedMovie(null);
            handleClear();
          }}
        >
          <h2>netflixroulette</h2>
        </button>
        {selectedMovie != null ? (
          <button className={styles.searchBtn}>
            <FaSearch
              onClick={() => {
                setSelectedMovie(null);
              }}
            />
          </button>
        ) : (
          <button
            className={styles.addBtn}
            onClick={() => {
              setCurrentDialog("add");
            }}
          >
            + ADD MOVIE
          </button>
        )}
      </div>
      {selectedMovie === null ? (
        <SearchForm initValue={`${searchQuery}`} onSearch={handleSearch} />
      ) : (
        <MovieDetails />
      )}
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
          <DeleteMovie id={currentMovie.id} onDelete={onMovieDelete} />
        </Dialog>
      )}
      <br />
      <div className={styles.genreBar}>
        <GenreSelect
          genreList={genreList}
          activeGenre={activeGenre}
          onSelect={handleSelect}
        />
        <SortControl defaultValue={sortBy} handleChange={handleSort} />
      </div>
      <div className={styles.movieFlex}>
        {movies.map((movie) => {
          return (
            <MovieTile
              {...movie}
              key={movie.id}
              onEdit={() => handleEdit(movie.id)}
              onDelete={() => handleDelete(movie.id)}
              handleClick={() => handleMovieCardClick(movie.id)}
            />
          );
        })}
      </div>
    </>
  );
}
