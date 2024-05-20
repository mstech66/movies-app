import { render, screen, waitFor } from '@testing-library/react';
import MovieDetails from './MovieDetails';
import '@testing-library/jest-dom'
import { convertTimeToReadableString, fetchMovie, joinItems } from '../../helpers/Helpers';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ movieId: 1 })
}));

jest.mock('../../helpers/Helpers', () => ({
  ...jest.requireActual('../../helpers/Helpers'),
  fetchMovie: jest.fn(),
}));

test('Renders the component correctly with the data', async () => {
  fetchMovie.mockResolvedValue({
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
  });
  render(<MemoryRouter><MovieDetails/></MemoryRouter>);
  const loading = screen.getByText(/Loading/i);
  expect(loading).toBeInTheDocument();
  await waitFor(() => screen.findByText("Test Movie"));
  expect(await screen.findByText("Test Movie")).toBeInTheDocument();
  expect(screen.getByText(new Date("2018-02-07").getFullYear())).toBeInTheDocument();
  expect(screen.getByText(joinItems([
    "Documentary",
    "Comedy"
]))).toBeInTheDocument();
  expect(screen.getByText(convertTimeToReadableString(106))).toBeInTheDocument();
  expect(screen.getByText("Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.")).toBeInTheDocument();
  expect(screen.getByText('6.1')).toBeInTheDocument();
});

test('renders withoutcrashing', () => {
    render(<MemoryRouter><MovieDetails /></MemoryRouter>);
});
