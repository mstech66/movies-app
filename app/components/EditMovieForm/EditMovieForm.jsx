import React, { useEffect, useState } from "react";
import MovieForm from '../MovieForm/MovieForm';
import Dialog from "../Dialog/Dialog";
import { editMovieData, fetchMovie } from "../../helpers/Helpers";
import { useLoaderData, useNavigate, useParams } from "@remix-run/react";

export default function EditMovieForm() {
  const navigate = useNavigate();
  const movie = useLoaderData();

  console.log('movie is', movie);

  const handleClose = () => {
    navigate("/");
  };

  const handleSubmit = async (value) => {
    await editMovieData(value);
    if (import.meta.env.VITE_APP_ENV !== 'test') {
      window.location.href = '/';
    } else {
      navigate('/');
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  } else {
    return (
      <Dialog title={"Edit Movie"} onClose={handleClose}>
        <MovieForm onSubmit={handleSubmit} movie={movie} />
      </Dialog>
    );
  }
}
