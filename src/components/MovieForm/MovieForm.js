import React, { useEffect, useRef, useState } from "react";
import styles from "./MovieForm.module.css";
import { genreList as allGenres } from "../../data/MoviesList";
import { generateIdFromTitle, joinItems } from "../../helpers/Helpers";

export default function MovieForm({ movie, onSubmit }) {
  const formRef = useRef();
  let initialState = movie === null ? {
    id: "",
    title: "",
    releaseDate: "",
    imgUrl: "",
    genreList: [],
    rating: 0,
    duration: "",
    description: "",
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
      return movie.genreList;
    }
    return [];
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(()=> {
    setFormData(prev => ({...prev, 'genreList': selectedGenres}))
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
    setSelectedGenres(initialState?.genreList || []);
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
      id: generateIdFromTitle(formData.title)
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
            name="releaseDate"
            data-testid='releaseDate'
            value={formData?.releaseDate || ""}
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
            name="imgUrl"
            data-testid='imgUrl'
            value={formData?.imgUrl || ""}
            placeholder="https://"
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Rating</label>
          <input
            id="rating"
            name="rating"
            data-testid='rating'
            value={formData?.rating || ""}
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
            name="duration"
            data-testid='duration'
            value={formData?.duration || ""}
            placeholder="minutes"
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label>Overview</label>
        <textarea
          id="description"
          name="description"
          data-testid='description'
          value={formData?.description || ""}
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
