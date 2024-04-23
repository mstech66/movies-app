import React from "react";
import "./App.css";
import MovieListPage from "./components/MovieListPage/MovieListPage";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import SearchForm from "./components/SearchForm/SearchForm";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import { fetchMovies } from "./helpers/Helpers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieListPage />,
    loader: loader,
    children: [
      { path: "/", element: <SearchForm /> },
      { path: "/:movieId", element: <MovieDetails /> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <div className="App">
        <Outlet />
      </div>
    </RouterProvider>
  );
}

async function loader() {
  let movies = await fetchMovies();
  return { movies };
}

export default App;
