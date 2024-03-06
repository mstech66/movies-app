import { fireEvent, render, screen } from '@testing-library/react';
import GenreSelect from './GenreSelect';
import '@testing-library/jest-dom'

const genreList = ["Crime", "Documentary", "Horror", "Comedy"];

test('Renders all the genres passed in props', () => {
  render(<GenreSelect genreList={genreList} />);
  const options = screen.getAllByRole('option');

  for(let i=0;i<genreList.length;i++){
    expect(options[i]).toHaveValue(genreList[i]);
  }
});

test('Component highlights the selected genre passed in props', () => {
  render(<GenreSelect genreList={genreList} selectedGenre="Comedy" />);
  expect(screen.getByTestId('genreSelect')).toHaveValue("Comedy")
});

test('After a click event on a genre button component calls "onChange" callback and passes correct genre in arguments', async () => {
  const selectHandler = jest.fn();
  render(<GenreSelect genreList={genreList} selectedGenre="Comedy" onSelect={selectHandler} />);
  await fireEvent.change(screen.getByTestId('genreSelect'), {target: {value: 'Horror'}})
  expect(selectHandler).toHaveBeenCalledWith('Horror')
});
