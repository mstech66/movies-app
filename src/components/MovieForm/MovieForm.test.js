import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { movieList } from "../../data/MoviesList";
import { joinItems } from "../../helpers/Helpers";
import MovieForm from "./MovieForm";

const movieData = movieList[0];

test("renders withoutcrashing", () => {
    render(<MovieForm />);
});

test("Updates on the input change", () => {
  const submitHandler = jest.fn();
  render(<MovieForm onSubmit={submitHandler} />);
  const titleInputField = screen.getByTestId("title");
  fireEvent.change(titleInputField, { target: { value: "Test Title" } });
  expect(titleInputField.value).toBe("Test Title");
});

test("Submits data properly", () => {
    const submitHandler = jest.fn();
    render(<MovieForm onSubmit={submitHandler} />);
    const titleInputField = screen.getByTestId("title");
    const releaseDateInputField = screen.getByTestId("releaseDate");
    const durationInputField = screen.getByTestId("duration");
    const imgUrlInputField = screen.getByTestId("imgUrl");
    const ratingInputField = screen.getByTestId("rating");
    const genreSelect = screen.getByTestId("genreSelect");
    const descrInputField = screen.getByTestId("description");
    const submitBtn = screen.getByTestId("submitBtn");
    fireEvent.change(titleInputField, { target: { value: movieData.title } });
    fireEvent.change(releaseDateInputField, { target: { value: movieData.releaseDate } });
    fireEvent.change(imgUrlInputField, { target: { value: movieData.imgUrl } });
    fireEvent.change(ratingInputField, { target: { value: movieData.rating } });
    fireEvent.change(descrInputField, { target: { value: movieData.description } });
    fireEvent.change(durationInputField, { target: { value: movieData.duration } });
    fireEvent.click(genreSelect);
    movieData.genreList.forEach(genre => {
        fireEvent.click(screen.getByTestId(genre));
    });
    expect(titleInputField.value).toBe(movieData.title);
    expect(releaseDateInputField.value).toBe(movieData.releaseDate);
    expect(imgUrlInputField.value).toBe(movieData.imgUrl);
    expect(ratingInputField.value).toBe(`${movieData.rating}`);
    expect(descrInputField.value).toBe(movieData.description);
    expect(durationInputField.value).toBe(movieData.duration);
    fireEvent.click(submitBtn);
    const expectedObj = {...movieData, id: "pulp_fiction", rating: "8.9"};
    expect(submitHandler).toHaveBeenCalledWith(expectedObj);
});

test("Populates data properly when movie object is passed through props", () => {
    const submitHandler = jest.fn();
    render(<MovieForm movie={movieData} onSubmit={submitHandler} />);
    const titleInputField = screen.getByTestId("title");
    const releaseDateInputField = screen.getByTestId("releaseDate");
    const durationInputField = screen.getByTestId("duration");
    const imgUrlInputField = screen.getByTestId("imgUrl");
    const ratingInputField = screen.getByTestId("rating");
    const genreSelect = screen.getByTestId("genreSelect");
    const descrInputField = screen.getByTestId("description");
    expect(titleInputField.value).toBe(movieData.title);
    expect(releaseDateInputField.value).toBe(movieData.releaseDate);
    expect(imgUrlInputField.value).toBe(movieData.imgUrl);
    expect(ratingInputField.value).toBe(`${movieData.rating}`);
    expect(descrInputField.value).toBe(movieData.description);
    expect(durationInputField.value).toBe(movieData.duration);
    expect(genreSelect.innerHTML).toContain(movieData.genreList[0], movieData.genreList[1]);
});

test("Resets data properly", () => {
    render(<MovieForm movie={movieData} />);
    const titleInputField = screen.getByTestId("title");
    const resetBtn = screen.getByTestId("resetBtn");
    fireEvent.change(titleInputField, { target: { value: 'Test Test Name' } });
    fireEvent.click(resetBtn);
    expect(titleInputField.value).toBe(movieData.title);
});