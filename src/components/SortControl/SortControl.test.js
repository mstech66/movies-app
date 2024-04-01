import { fireEvent, render, screen } from '@testing-library/react';
import SortControl from './SortControl';
import '@testing-library/jest-dom'

const optionList = ["releaseDate", "title"];

test('Renders all the options', () => {
  render(<SortControl />);
  const options = screen.getAllByRole('option');

  for(let i=0;i<optionList.length;i++){
    expect(options[i]).toHaveValue(optionList[i]);
  }
});

test('Verify title is selected as default value when passed through props', () => {
  render(<SortControl defaultValue="title" />);
  expect(screen.getByTestId('sortSelect')).toHaveValue("title")
});

test('After a click event on SortControl Component calls "handleChange" callback and passes correct value in arguments', async () => {
  const selectHandler = jest.fn(); //this is a mock
  render(<SortControl defaultValue="releaseDate" handleChange={selectHandler} />);
  await fireEvent.change(screen.getByTestId('sortSelect'), {target: {value: 'title'}})
  expect(selectHandler).toHaveBeenCalledWith('title') //verify the mock function called with correct args
});
