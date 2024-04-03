import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import MovieListPage from './MovieListPage';

test('renders without crashing', () => {
    render(<MovieListPage />);
});

test('searches correctly', () => {
    render(<MovieListPage />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test Search' } })
    expect(screen.getByDisplayValue(/Test Search/i)).toBeTruthy();
});

test('changes genre correctly', async () => {
    render(<MovieListPage />);
    fireEvent.click(screen.getByTestId('btn-Documentary'));
    expect(screen.getByTestId('item-Documentary')).toHaveAttribute('aria-current', 'true');
});
