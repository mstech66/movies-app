import React, { useEffect, useRef, useState } from "react";
import styles from "./MovieForm.module.css";
import { genreList as allGenres } from "../../data/MoviesList";
import { getRandomId, joinItems } from "../../helpers/Helpers";

export default function MovieForm({ movie, onSubmit }) {
  const formRef = useRef();
  let initialState = movie === null ? {
    id: "",
    title: "",
    release_date: "",
    poster_path: "",
    genres: [],
    vote_average: 0,
    runtime: "",
    overview: "",
  } : movie;
  const [formData, setFormData] = useState(() => {
    if (movie) {
      return movie;
    }
    return initialState;
  });

  useEffect(() => {
    if (movie) {
      setFormData(movie);
    }
  }, [movie]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState(() => {
    if(movie){
      return movie.genres;
    }
    return [];
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(()=> {
    setFormData(prev => ({...prev, 'genres': selectedGenres}))
  }, [selectedGenres])

  const handleGenreToggle = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData(initialState);
    setSelectedGenres(initialState?.genres || []);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFormData = {
      ...formData,
      id: formData.id || getRandomId()
    }
    onSubmit(finalFormData);
  };

  return (
    <form ref={formRef} className={styles.movieForm} onSubmit={handleSubmit}>
      <div className={styles.inlineContainer}>
        <div className={styles.inputContainer}>
          <label>Title</label>
          <input
            id="title"
            name="title"
            data-testid='title'
            value={formData?.title || ""}
            placeholder="Title"
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Release Date</label>
          <input
            id="releaseDate"
            type="text"
            name="release_date"
            data-testid='releaseDate'
            value={formData?.release_date || ""}
            placeholder="Select Date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.inlineContainer}>
        <div className={styles.inputContainer}>
          <label>Movie URL</label>
          <input
            id="imgUrl"
            name="poster_path"
            data-testid='imgUrl'
            value={formData?.poster_path || ""}
            placeholder="https://"
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Rating</label>
          <input
            id="rating"
            name="vote_average"
            data-testid='rating'
            value={formData?.vote_average || ""}
            placeholder="7.8"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.inlineContainer}>
        <div className={styles.inputContainer}>
          <label>Genre</label>
          <div>
            <div
              onClick={toggleDropdown}
              className={styles.genreSelect}
              data-testid='genreSelect'
            >
              {selectedGenres.length > 0
                ? joinItems(selectedGenres)
                : "Select Genre"}
            </div>
            {isOpen && (
              <div
                className={styles.genreSelectContent}
              >
                {allGenres.map((genre) => (
                  <div key={genre} style={{ padding: "10px" }}>
                    <input
                      type="checkbox"
                      data-testid={genre}
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreToggle(genre)}
                    />
                    {genre}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label>Runtime</label>
          <input
            id="duration"
            name="runtime"
            data-testid='duration'
            value={formData?.runtime || ""}
            placeholder="minutes"
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label>Overview</label>
        <textarea
          id="description"
          name="overview"
          data-testid='description'
          value={formData?.overview || ""}
          placeholder="Movie Description"
          onChange={handleChange}
        />
      </div>
      <div className={styles.btnGroup}>
        <button className={styles.secondaryBtn} onClick={handleReset} data-testid='resetBtn'>
          Reset
        </button>
        <button className={styles.primaryBtn} type="submit" data-testid='submitBtn'>
          Submit
        </button>
      </div>
    </form>
  );
}
