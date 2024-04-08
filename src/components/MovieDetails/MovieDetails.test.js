import { render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';
import '@testing-library/jest-dom'
import { movieList } from '../../data/MoviesList';
import { convertTimeToReadableString, joinItems } from '../../helpers/Helpers';

const movieData = movieList[0];

test('Renders the component correctly with the data', () => {
  render(<MovieDetails {...movieData}/>);
  expect(screen.getByText(movieData.title)).toBeInTheDocument();
  expect(screen.getByText(new Date(movieData.release_date).getFullYear())).toBeInTheDocument();
  expect(screen.getByText(joinItems(movieData.genres))).toBeInTheDocument();
  expect(screen.getByText(convertTimeToReadableString(movieData.runtime))).toBeInTheDocument();
  expect(screen.getByText(movieData.overview)).toBeInTheDocument();
  expect(screen.getByText(movieData.vote_average)).toBeInTheDocument();
});

test('renders withoutcrashing', () => {
    render(<MovieDetails />);
});
