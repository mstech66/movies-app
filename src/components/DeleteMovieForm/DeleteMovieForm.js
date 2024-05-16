import React from "react";
import Dialog from "../Dialog/Dialog";
import DeleteMovie from "../DeleteMovie/DeleteMovie";
import { useNavigate, useParams } from "react-router-dom";
import { deleteMovieData } from "../../helpers/Helpers";

export default function DeleteMovieForm() {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const handleClose = () => {
    navigate('/');
  };

  const handleDelete = async (id) => {
    await deleteMovieData(id);
    if (process.env.NODE_ENV !== 'test') {
      window.location.href = '/';
    } else {
      navigate('/');
    }
  };

  return (
    <Dialog title={"Delete Movie"} onClose={handleClose}>
      <DeleteMovie id={Number(movieId)} onDelete={handleDelete} />
    </Dialog>
  );
}
