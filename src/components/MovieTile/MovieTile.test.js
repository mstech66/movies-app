import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MovieTile from "./MovieTile";
import "@testing-library/jest-dom";
import { movieList } from "../../data/MoviesList";
import { joinItems } from "../../helpers/Helpers";

const movieData = movieList[0];

test("Renders the component correctly with the data", () => {
  render(<MovieTile {...movieData} />);
  expect(screen.getByText(movieData.title)).toBeInTheDocument();
  expect(screen.getByText(movieData.releaseDate)).toBeInTheDocument();
  expect(screen.getByText(joinItems(movieData.genreList))).toBeInTheDocument();
});

test("renders withoutcrashing", () => {
  render(<MovieTile />);
});

test('After a click event on MovieTile Component calls "handleClick" callback and passes correct value in arguments', async () => {
  const clickHandler = jest.fn();
  render(<MovieTile {...movieData} handleClick={clickHandler} />);
  fireEvent.click(screen.getByTestId(`${movieData.id}-img`));
  expect(clickHandler).toHaveBeenCalledTimes(1);
  expect(clickHandler).toHaveBeenCalledWith(movieData.id);
});
