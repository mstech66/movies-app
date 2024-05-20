import { Outlet, json } from '@remix-run/react';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import { fetchMovie } from '../helpers/Helpers';

export let loader = async({request}) => {
  const url = new URL(request.url);
  const movieId = url.pathname.slice(1).split("/")[0];
  console.log('Movie id in loader is ', movieId);
  const movie = await fetchMovie(movieId);
  console.log(movie);
  return json(movie);
}

export default function MovieDetailsRoute() {
  return <>
    <MovieDetails />
    <Outlet />
  </>;
}