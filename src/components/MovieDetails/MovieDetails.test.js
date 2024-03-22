import { fireEvent, render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';
import '@testing-library/jest-dom'
import { movieList } from '../../data/MoviesList';
import { joinItems } from '../../helpers/Helpers';

const movieData = movieList[0];

test('Renders the component correctly with the data', () => {
  render(<MovieDetails {...movieData}/>);
  expect(screen.getByText(movieData.title)).toBeInTheDocument();
  expect(screen.getByText(movieData.releaseDate)).toBeInTheDocument();
  expect(screen.getByText(joinItems(movieData.genreList))).toBeInTheDocument();
  expect(screen.getByText(movieData.duration)).toBeInTheDocument();
  expect(screen.getByText(movieData.description)).toBeInTheDocument();
  expect(screen.getByText(movieData.rating)).toBeInTheDocument();
});

test('renders withoutcrashing', () => {
    render(<MovieDetails />);
});
