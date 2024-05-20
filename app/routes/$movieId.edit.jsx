import { json } from '@remix-run/react';
import EditMovieForm from '../components/EditMovieForm/EditMovieForm';
import { fetchMovie } from '../helpers/Helpers';

export let loader = async ({params}) => {
  const movie = await fetchMovie(params.movieId);
  return json(movie);
}

export default function EditMovieRoute() {
  return <EditMovieForm />;
}
