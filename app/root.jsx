import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLocation,
} from "@remix-run/react";
import './index.css';
import MovieListPage from "./components/MovieListPage/MovieListPage";
import NavBar from "./components/NavBar/NavBar";
import { SearchProvider } from "./contexts/SearchContext";
import SearchForm from "./components/SearchForm/SearchForm";
import { fetchMovies } from "./helpers/Helpers";

export let loader = async ({request}) => {
  const url = new URL(request.url);
  const sortBy = url.searchParams.get("sortBy") || "release_date";
  const genre = url.searchParams.get("genre") || "All";
  const searchQuery = url.searchParams.get("query") || "";
  let movies = await fetchMovies(sortBy, genre, searchQuery);
  return json({ movies }, { status: 200 });
};

// eslint-disable-next-line react/prop-types
export function Layout({ children }) {
  const { pathname } = useLocation();
  const displaySearchForm = pathname === '/' || pathname.includes('/new');

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SearchProvider>
        <NavBar />
        {displaySearchForm && <SearchForm />}
        {children}
        <MovieListPage />
        </SearchProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
