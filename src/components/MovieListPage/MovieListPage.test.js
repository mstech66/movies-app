import "@testing-library/jest-dom";
import MovieListPage from "./MovieListPage";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLoaderData: () => ({ movies: [{
        "id": 337167,
        "title": "Test Movie",
        "tagline": "Don't miss the climax",
        "vote_average": 6.1,
        "vote_count": 1195,
        "release_date": "2018-02-07",
        "poster_path": "https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg",
        "overview": "Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.",
        "budget": 55000000,
        "revenue": 136906000,
        "genres": [
            "Documentary",
            "Comedy"
        ],
        "runtime": 106
    }] })
}));

test("renders without crashing", async () => {
  render(
    <MemoryRouter>
        <MovieListPage />
    </MemoryRouter>
  );
});

test("changes genre correctly", async () => {
  render(
    <MemoryRouter>
      <MovieListPage />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByTestId("btn-Documentary"));
  expect(screen.getByTestId("item-Documentary")).toHaveAttribute(
    "aria-current",
    "true"
  );
});
