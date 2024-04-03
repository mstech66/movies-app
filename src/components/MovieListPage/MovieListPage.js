import React, { useEffect, useState } from "react";
import styles from "./MovieListPage.module.css";
import { findObjectById } from "../../helpers/Helpers";
import MovieTile from "../MovieTile/MovieTile";
import SearchForm from "../SearchForm/SearchForm";
import MovieDetails from "../MovieDetails/MovieDetails";
import Dialog from "../Dialog/Dialog";
import MovieForm from "../MovieForm/MovieForm";
import DeleteMovie from "../DeleteMovie/DeleteMovie";
import SortControl from "../SortControl/SortControl";
import GenreSelect from "../GenreSelect/GenreSelect";
import {FaSearch} from 'react-icons/fa';

const genreList = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];

export default function MovieListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movieDetail, setMovieDetail] = useState(null);
  const [sortBy, setSortBy] = useState("release_date");
  const [activeGenre, setActiveGenre] = useState("All");
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [currentDialog, setCurrentDialog] = useState(null);

  function handleSearch(value) {
    console.log("Searching for", value);
    setSearchQuery(value);
  }

  const handleMovieCardClick = async (value) => {
    await findObjectById(movies, value).then((res) => {
      setMovieDetail(res);
    });
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  const handleSelect = (value) => {
    setActiveGenre(value);
  }

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

  const onMovieDelete = async(id) => {
    console.log('Deleting finally for', id);
    //todo: delete logic
    setCurrentDialog(null);
  }

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery !== "") {
        params.append('search', searchQuery);
        params.append('searchBy', 'title');
    }

    if (sortBy !== "") {
        params.append('sortBy', sortBy);
        params.append('sortOrder', 'asc');
    }
    if (activeGenre !== "All") {
        params.append('filter', activeGenre);
    }
    const reqUrl = `http://localhost:4000/movies?${params.toString()}`;
    fetch(reqUrl)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.data || []);
      })
      .catch((err) => console.log(err));
  }, [sortBy, searchQuery, activeGenre]);

  return (
    <>
      <div className={styles.navBar}>
        <button className={styles.appNameTitle} onClick={()=>{
            setMovieDetail(null);
          }}><h2>netflixroulette</h2></button>
        {movieDetail != null ? (
          <button className={styles.searchBtn}><FaSearch onClick={()=>{
            setMovieDetail(null);
          }}/></button>
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
      {movieDetail === null ? (
        <SearchForm initValue={`${searchQuery}`} onSearch={handleSearch} />
      ) : (
        <MovieDetails {...movieDetail} />
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
        <GenreSelect genreList={genreList} activeGenre={activeGenre} onSelect={handleSelect}/>
        <SortControl defaultValue={sortBy} handleChange={handleSort} />
      </div>
      <div className={styles.movieFlex}>
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
    </>
  );
}