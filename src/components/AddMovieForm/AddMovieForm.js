import React from "react";
import MovieForm from "../MovieForm/MovieForm";
import Dialog from "../Dialog/Dialog";
import { useNavigate } from "react-router-dom";
import { postMovieData } from "../../helpers/Helpers";

export default function AddMovieForm() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  const handleSubmit = async (value) => {
    console.log("Adding movie", value);
    await postMovieData(value);
    navigate('/');
  };

  return (
    <Dialog title={"Add Movie"} onClose={handleClose}>
      <MovieForm onSubmit={handleSubmit} />
    </Dialog>
  );
}
