import { Outlet, json } from '@remix-run/react';
import { fetchMovies } from '../helpers/Helpers';

export default function Index() {
  return <>
    {/* <MovieListPage /> */}
    <Outlet />
  </>;
}