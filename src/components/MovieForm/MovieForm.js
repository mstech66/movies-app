import React, { useEffect, useRef, useState } from "react";
import styles from "./MovieForm.module.css";
import { genreList as allGenres } from "../../data/MoviesList";
import { isValidURL, joinItems } from "../../helpers/Helpers";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";

export default function MovieForm({ movie, onSubmit }) {
  const formRef = useRef();
  const dropdownRef = useRef();
  let initialState =
    movie === null
      ? {
          id: "",
          title: "",
          release_date: "",
          poster_path: "",
          genres: [],
          vote_average: 0,
          runtime: "",
          overview: "",
        }
      : movie;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: movie || initialState
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState(() => {
    if (movie) {
      return movie.genres;
    }
    return [];
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleGenreToggle = (genre, value, onChange) => {
    let nextGenres;
    if (value.includes(genre)) {
      nextGenres = value.filter((g) => g !== genre);
    } else {
      nextGenres = [...value, genre];
    }
    onChange(nextGenres);
    return nextGenres;
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset(initialState);
  };

  const handleFormSubmit = (data) => {
    try {
      data.vote_average = Number(data.vote_average);
      data.runtime = Number(data.runtime);
      onSubmit(data);
    } catch (error) {
      console.log("handleFormSubmit:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <form
      ref={formRef}
      className={styles.movieForm}
      data-testid="movieForm"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={styles.inlineContainer}>
        <div className={styles.inputContainer}>
          <label>Title*</label>
          <input
            id="title"
            name="title"
            data-testid="title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 5,
                message: "Title should have minimum 5 characters",
              },
            })}
            placeholder="Title"
          />
          {errors.title && (
            <span className={styles.errorSpan}>{errors.title.message}</span>
          )}
        </div>
        <div className={styles.inputContainer}>
          <label>Release Date*</label>
          <input
            id="releaseDate"
            type="text"
            name="release_date"
            {...register("release_date", {
              required: "Date is required",
              validate: (value) => {
                let inputYear = new Date(value).getFullYear();
                return (
                  (inputYear >= 1800 && inputYear <= currentYear) ||
                  "Invalid year. Year should be between 1800 and current year."
                );
              },
            })}
            data-testid="releaseDate"
            placeholder="Select Date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
          {errors.release_date && (
            <span className={styles.errorSpan}>
              {errors.release_date.message}
            </span>
          )}
        </div>
      </div>
      <div className={styles.inlineContainer}>
        <div className={styles.inputContainer}>
          <label>Movie URL*</label>
          <input
            id="imgUrl"
            name="poster_path"
            {...register("poster_path", {
              required: "Enter Poster Link",
              validate: isValidURL,
            })}
            data-testid="imgUrl"
            placeholder="https://"
          />
          {errors.poster_path && (
            <span className={styles.errorSpan}>
              {errors.poster_path.message}
            </span>
          )}
        </div>
        <div className={styles.inputContainer}>
          <label>Rating*</label>
          <input
            id="rating"
            name="vote_average"
            {...register("vote_average", {
              required: "Please enter a rating",
              validate: (value) =>
                (value >= 0 && value <= 10) ||
                "Rating should be between 0 and 10",
            })}
            data-testid="rating"
            placeholder="7.8"
          />
          {errors.vote_average && (
            <span className={styles.errorSpan}>
              {errors.vote_average.message}
            </span>
          )}
        </div>
      </div>
      <div className={styles.inlineContainer}>
        <Controller
          name="genres"
          control={control}
          defaultValue={selectedGenres}
          rules={{ required: "Please select a genre" }}
          render={({ field: { onChange, value } }) => (
            <div className={styles.inputContainer}>
              <label>Genre*</label>
              <div>
                <div
                  onClick={toggleDropdown}
                  className={styles.genreSelect}
                  data-testid="genreSelect"
                >
                  {value && value.length > 0
                    ? joinItems(value)
                    : "Select Genre"}
                </div>
                {isOpen && (
                  <div className={styles.genreSelectContent} ref={dropdownRef}>
                    {allGenres.map((genre) => (
                      <div key={genre} style={{ padding: "10px" }}>
                        <input
                          type="checkbox"
                          data-testid={genre}
                          checked={value.includes(genre)}
                          onChange={() =>
                            handleGenreToggle(genre, value, onChange)
                          }
                        />
                        {genre}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.genres && (
                <span className={styles.errorSpan}>
                  {errors.genres.message}
                </span>
              )}
            </div>
          )}
        />
        <div className={styles.inputContainer}>
          <label>Runtime*</label>
          <input
            id="duration"
            name="runtime"
            {...register("runtime", {
              required: "Please enter the runtime",
              pattern: {
                value: /^[0-9]*$/,
                message: "Invalid runtime format. It must be a number.",
              },
            })}
            data-testid="duration"
            placeholder="minutes"
          />
          {errors.runtime && (
            <span className={styles.errorSpan}>{errors.runtime.message}</span>
          )}
        </div>
      </div>
      <div>
        <label>Overview</label>
        <textarea
          id="description"
          name="overview"
          {...register("overview")}
          data-testid="description"
          placeholder="Movie Description"
        />
      </div>
      <div className={styles.btnGroup}>
        <button
          className={styles.secondaryBtn}
          onClick={handleReset}
          data-testid="resetBtn"
        >
          Reset
        </button>
        <button
          className={styles.primaryBtn}
          type="submit"
          data-testid="submitBtn"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

MovieForm.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  poster_path: PropTypes.string,
  genres: PropTypes.array,
  release_date: PropTypes.string,
  overview: PropTypes.string,
  vote_average: PropTypes.number,
  runtime: PropTypes.number,
  onSubmit: PropTypes.func,
};
