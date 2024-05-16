import React, { useEffect, useState } from "react";
import styles from "./MovieListPage.module.css";
import { fetchMovies } from "../../helpers/Helpers";
import MovieTile from "../MovieTile/MovieTile";
import SortControl from "../SortControl/SortControl";
import GenreSelect from "../GenreSelect/GenreSelect";
import { FaSearch } from "react-icons/fa";
import {
  Outlet,
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
  const navigate = useNavigate();
  const { movieId } = useParams();

  function handleSearch(value) {
    let params = new URLSearchParams(searchParams.toString());
    value ? params.set("query", value) : params.delete("query");
    setSearchParams(params);
    setSearchQuery(value);
    navigate(`?${params.toString()}`);
  }

  function handleAdd(){
    navigate(`/new`);
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

  const handleEdit = (id) => {
    navigate(`/${id}/edit`);
  }

  const handleDelete = (id) => {
    navigate(`/${id}/delete`);
  }

  return (
    <>
      <div className={styles.navBar}>
        <button
          id="appNameTitle"
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
            id="addBtn"
            className={styles.addBtn}
            onClick={() => {
              handleAdd();
            }}
          >
            + ADD MOVIE
          </button>
        )}
      </div>
      <Outlet context={[searchQuery, handleSearch]}/>
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
