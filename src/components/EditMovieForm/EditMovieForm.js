import React, { useEffect, useState } from "react";
import MovieForm from "../MovieForm/MovieForm";
import Dialog from "../Dialog/Dialog";
import { useNavigate, useParams } from "react-router-dom";
import { editMovieData, fetchMovie } from "../../helpers/Helpers";

export default function EditMovieForm() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchDetails() {
      const fetchedMovie = await fetchMovie(movieId);
      setMovie(fetchedMovie);
      setLoading(false);
    }
    fetchDetails();
  }, [movieId]);

  const handleClose = () => {
    navigate("/");
  };

  const handleSubmit = async (value) => {
    await editMovieData(value);
    if (process.env.NODE_ENV !== 'test') {
      window.location.href = '/';
    } else {
      navigate('/');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Dialog title={"Edit Movie"} onClose={handleClose}>
        <MovieForm onSubmit={handleSubmit} movie={movie} />
      </Dialog>
    );
  }
}
