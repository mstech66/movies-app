import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { movieList } from '../../data/MoviesList';
import { joinItems } from '../../helpers/Helpers';
import DeleteMovie from './DeleteMovie';

test('renders withoutcrashing', () => {
    const handleDelete = jest.fn();
    render(<DeleteMovie id="1" onDelete={handleDelete} />);
});

test('renders DeleteMovie text', () => {
    const handleDelete = jest.fn();
    render(<DeleteMovie id="1" onDelete={handleDelete} />);
    expect(screen.getByText(/Are you sure you want to delete this movie?/i)).toBeInTheDocument();
});

test('calls onDelete prop when click on Confirm button', async () => {
    const onDelete = jest.fn();
    const id = "1";
  
    render(<DeleteMovie id={id} onDelete={onDelete} />);
    
    fireEvent.click(screen.getByText(/Confirm/i));
  
    expect(onDelete).toHaveBeenCalledWith(id);
    expect(onDelete).toHaveBeenCalledTimes(1);
});