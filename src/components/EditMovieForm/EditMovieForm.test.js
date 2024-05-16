import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { useParams, useNavigate } from "react-router-dom";
import EditMovieForm from "./EditMovieForm";
import "@testing-library/jest-dom";
import { movieList } from "../../data/MoviesList";
import userEvent from "@testing-library/user-event";
import { fetchMovie } from "../../helpers/Helpers";

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
  fetchMovie.mockResolvedValueOnce(movieData);
});

it("renders", async () => {
  render(<EditMovieForm />);
  await waitFor(() => screen.findByText("EDIT MOVIE"));
  expect(screen.getByText("EDIT MOVIE")).toBeInTheDocument();
});

it("navigates back to home page on close", async () => {
  render(<EditMovieForm />);
  await waitFor(() => screen.findByText("EDIT MOVIE"));
  const closeButton = screen.getByTestId("closeBtn");
  fireEvent.click(closeButton);
  expect(navigate).toHaveBeenCalledWith("/");
});

it("loads all movie data correctly", async () => {
  render(<EditMovieForm />);
  await waitFor(() => screen.findByText("EDIT MOVIE"));
  const { title, release_date, poster_path, vote_average, overview, runtime } =
    movieData;
  const titleInputField = screen.getByTestId("title");
  const releaseDateInputField = screen.getByTestId("releaseDate");
  const durationInputField = screen.getByTestId("duration");
  const imgUrlInputField = screen.getByTestId("imgUrl");
  const ratingInputField = screen.getByTestId("rating");
  const descrInputField = screen.getByTestId("description");
  expect(titleInputField.value).toBe(title);
  expect(releaseDateInputField.value).toBe(release_date);
  expect(imgUrlInputField.value).toBe(poster_path);
  expect(ratingInputField.value).toBe(`${vote_average}`);
  expect(descrInputField.value).toBe(overview);
  expect(durationInputField.value).toBe(`${runtime}`);
});

it("confirming on data it navigates to the home page", async() => {
    render(<EditMovieForm />);
  await waitFor(() => screen.findByText("EDIT MOVIE"));
  const submitBtn = screen.getByTestId("submitBtn");
  userEvent.click(submitBtn);
  await waitFor(() => {
    expect(navigate).toHaveBeenCalledWith("/");
  });
});