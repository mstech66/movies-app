import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { movieList } from "../../data/MoviesList";
import MovieForm from "./MovieForm";
import userEvent from "@testing-library/user-event";

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

test("Submits data properly", async () => {
    const submitHandler = jest.fn();
    const {title, release_date, genres, poster_path, vote_average, overview, runtime} = movieData;
    render(<MovieForm onSubmit={submitHandler} />);
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

    expect(titleInputField.value).toBe(title);
    expect(releaseDateInputField.value).toBe(release_date);
    expect(imgUrlInputField.value).toBe(poster_path);
    expect(ratingInputField.value).toBe(`${vote_average}`);
    expect(descrInputField.value).toBe(overview);
    expect(durationInputField.value).toBe(`${runtime}`);

    userEvent.click(submitBtn);
    await waitFor(() => {
        expect(submitHandler).toHaveBeenCalled();
    });

    expect(submitHandler).toHaveBeenCalledWith(expect.objectContaining({
        'title': title,
        'vote_average': Number(vote_average),
        'overview': overview,
        'runtime': Number(runtime),
        'genres': genres,
        'poster_path': poster_path,
        'release_date': release_date
    }));
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
    expect(releaseDateInputField.value).toBe(movieData.release_date);
    expect(imgUrlInputField.value).toBe(movieData.poster_path);
    expect(ratingInputField.value).toBe(`${movieData.vote_average}`);
    expect(descrInputField.value).toBe(movieData.overview);
    expect(durationInputField.value).toBe(`${movieData.runtime}`);
    expect(genreSelect.innerHTML).toContain(movieData.genres[0], movieData.genres[1]);
});

test("Resets data properly", () => {
    render(<MovieForm movie={movieData} />);
    const titleInputField = screen.getByTestId("title");
    const resetBtn = screen.getByTestId("resetBtn");
    fireEvent.change(titleInputField, { target: { value: 'Test Test Name' } });
    fireEvent.click(resetBtn);
    expect(titleInputField.value).toBe(movieData.title);
});
