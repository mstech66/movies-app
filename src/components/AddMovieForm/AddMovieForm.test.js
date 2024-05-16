import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { useParams, useNavigate } from "react-router-dom";
import AddMovieForm from "./AddMovieForm";
import "@testing-library/jest-dom";
import { movieList } from "../../data/MoviesList";
import userEvent from "@testing-library/user-event";

const movieData = movieList[0];

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node) => node,
}));

jest.mock("focus-trap-react", () => {
  return ({ children }) => <div>{children}</div>;
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("../../helpers/Helpers");
let navigate;

beforeEach(() => {
  navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);
  useParams.mockReturnValue({ movieId: 123 });
});

it("renders", async () => {
  render(<AddMovieForm />);
  await waitFor(() => screen.findByText("ADD MOVIE"));
  expect(screen.getByText("ADD MOVIE")).toBeInTheDocument();
});

it("navigates back to home page on close", () => {
  render(<AddMovieForm />);
  const closeButton = screen.getByTestId("closeBtn");
  fireEvent.click(closeButton);
  expect(navigate).toHaveBeenCalledWith("/");
});

it("Add movie and navigates back to home page on submit", async () => {
  render(<AddMovieForm />);
  const {
    title,
    release_date,
    genres,
    poster_path,
    vote_average,
    overview,
    runtime,
  } = movieData;
  const titleInputField = screen.getByTestId("title");
  const releaseDateInputField = screen.getByTestId("releaseDate");
  const durationInputField = screen.getByTestId("duration");
  const imgUrlInputField = screen.getByTestId("imgUrl");
  const ratingInputField = screen.getByTestId("rating");
  const genreSelect = screen.getByTestId("genreSelect");
  const descrInputField = screen.getByTestId("description");
  const submitBtn = screen.getByTestId("submitBtn");

  userEvent.type(titleInputField, title);
  userEvent.type(releaseDateInputField, release_date);
  userEvent.type(imgUrlInputField, poster_path);
  userEvent.type(ratingInputField, String(vote_average));
  userEvent.type(descrInputField, overview);
  userEvent.type(durationInputField, String(runtime));

  fireEvent.click(genreSelect);

  await Promise.all(
    genres.map(async (genre) => {
      await waitFor(() => screen.findByTestId(genre));
      userEvent.click(screen.getByTestId(genre));
    })
  );
  userEvent.click(submitBtn);
  await waitFor(() => {
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
