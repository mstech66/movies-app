import { fireEvent, render, screen } from '@testing-library/react';
import GenreSelect from './GenreSelect';
import '@testing-library/jest-dom'

const genreList = ["Crime", "Documentary", "Horror", "Comedy"];

test('Renders all the genres passed in props', () => {
  render(<GenreSelect genreList={genreList} />);
  const options = screen.getAllByRole('listitem')

  for(let i=0;i<genreList.length;i++){
    expect(options[i]).toHaveTextContent(genreList[i]);
  }
});

test('Component highlights the selected genre passed in props', () => {
  render(<GenreSelect genreList={genreList} activeGenre='Comedy' />);
  expect(screen.getByTestId(`item-Comedy`)).toHaveAttribute('aria-current', 'true');
});

test('After a click event on a genre button component calls "onChange" callback and passes correct genre in arguments', async () => {
  const selectHandler = jest.fn(); //this is a mock
  render(<GenreSelect genreList={genreList} activeGenre='Comedy' onSelect={selectHandler}/>);
  await fireEvent.click(screen.getByTestId('btn-Horror'))
  expect(selectHandler).toHaveBeenCalledWith('Horror') //verify the mock function called with correct args
});
