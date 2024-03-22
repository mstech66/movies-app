import { fireEvent, render, screen } from '@testing-library/react';
import SortControl from './SortControl';
import '@testing-library/jest-dom'

const optionList = ["releaseYear", "name"];

test('Renders all the options', () => {
  render(<SortControl />);
  const options = screen.getAllByRole('option');

  for(let i=0;i<optionList.length;i++){
    expect(options[i]).toHaveValue(optionList[i]);
  }
});

test('Verify name is selected as default value when passed through props', () => {
  render(<SortControl defaultValue="name" />);
  expect(screen.getByTestId('sortSelect')).toHaveValue("name")
});

test('After a click event on SortControl Component calls "handleChange" callback and passes correct value in arguments', async () => {
  const selectHandler = jest.fn(); //this is a mock
  render(<SortControl defaultValue="releaseYear" handleChange={selectHandler} />);
  await fireEvent.change(screen.getByTestId('sortSelect'), {target: {value: 'name'}})
  expect(selectHandler).toHaveBeenCalledWith('name') //verify the mock function called with correct args
});
