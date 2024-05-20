import React from "react";
import styles from "./NavBar.module.css";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useParams } from "@remix-run/react";
import { useSearch } from "../../contexts/SearchContext";

export default function NavBar() {
  const { handleSearch } = useSearch();
  const navigate = useNavigate();
  const { movieId } = useParams();
  const isMovieDetailsPage = !!movieId;

  function handleAdd() {
    navigate(`/new`);
  }

  const clearFilters = () => {
    handleSearch("");

    let params = new URLSearchParams();
    params.delete("sortBy");
    params.delete("genre");
    navigate(`/?${params.toString()}`);
  };

  return (
    <div className={styles.navBar}>
      <Link
        id="appNameTitle"
        className={styles.appNameTitle}
        to={"/"}
      >
        <h2>netflixroulette</h2>
      </Link>
      {isMovieDetailsPage === true ? (
        <Link className={styles.searchBtn} to={"/"}>
          <FaSearch
          />
        </Link>
      ) : (
        <Link
          id="addBtn"
          className={styles.addBtn}
          to={"/new"}
        >
          + ADD MOVIE
        </Link>
      )}
    </div>
  );
}
