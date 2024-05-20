import React, { useEffect, useState } from "react";
import styles from "./MovieListPage.module.css";
import { useLoaderData } from "../../helpers/Helpers";
import MovieTile from "../MovieTile/MovieTile";
import SortControl from "../SortControl/SortControl";
import GenreSelect from "../GenreSelect/GenreSelect";

import { useNavigate, useParams, useSearchParams} from '@remix-run/react';
import { useSearch } from "../../contexts/SearchContext";

const genreList = ["All", "Documentary", "Comedy", "Horror", "Crime"];

export default function MovieListPage({initialMovies}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery } = useSearch();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "release_date"
  );
  const [activeGenre, setActiveGenre] = useState(
    searchParams.get("genre") || "All"
  );
  const data = useLoaderData();

  let movies = data.movies || [];
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
    console.log('movie clicked')
    setSelectedMovie(id);
    navigate(`/${id}`);
  };

  const handleSort = (value) => {
    console.log(value);
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
    setActiveGenre(searchParams.get('genre') || 'All');
    setSortBy(searchParams.get('sortBy') || 'release_date');
  }, [searchParams.get('genre'), searchParams.get('sortBy')]);

  useEffect(() => {
    if (movieId) {
      setSelectedMovie(movieId);
    }
  }, [movieId]);

  const handleEdit = (id) => {
    console.log('edit clicked')
    navigate(`/${id}/edit`);
  }

  const handleDelete = (id) => {
    navigate(`/${id}/delete`);
  }

  return (
    <>
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
