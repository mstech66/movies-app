import React, { useRef, useState } from "react";
import styles from "./MovieForm.module.css";

export default function MovieForm({ movie, onSubmit }) {
  const formRef = useRef();
  let initialState = {
    title: "",
    releaseDate: "",
    imgUrl: "",
    genreList: [],
    rating: 0,
    duration: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialState);

  if (movie) {
    console.log(movie)
    setFormData(movie);
  }

  const handleReset = (e) => {
    e.preventDefault();
    formRef.current.reset();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log(formData);
  };

  return (
    <form ref={formRef} className={styles.movieForm} onSubmit={handleSubmit}>
      <div className={styles.inlineContainer}>
        <div className={styles.inputContainer}>
          <label>Title</label>
          <input
            id="title"
            name="title"
            defaultValue={formData.title || ""}
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
            defaultValue={formData.releaseDate || ""}
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
            defaultValue={formData.imgUrl || ""}
            placeholder="https://"
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Rating</label>
          <input
            id="rating"
            name="rating"
            defaultValue={formData.rating || ""}
            placeholder="7.8"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.inlineContainer}>
        <div className={styles.inputContainer}>
          <label>Genre</label>
          <select onChange={handleChange}>
            <option>Action</option>
            <option>Horror</option>
            <option>Comedy</option>
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label>Runtime</label>
          <input
            id="duration"
            name="duration"
            defaultValue={formData.duration || ""}
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
          defaultValue={formData.description || ""}
          placeholder="Movie Description"
          onChange={handleChange}
        />
      </div>
      <div className={styles.btnGroup}>
        <button className={styles.secondaryBtn} onClick={handleReset}>
          Reset
        </button>
        <button className={styles.primaryBtn} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
