import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import Dialog from './Dialog';

jest.mock('focus-trap-react', () => {
  return ({ children }) => <div>{children}</div>
})

beforeEach(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root'); 
    document.body.appendChild(modalRoot);
});

afterEach(cleanup);

test('renders Dialog with title and children', () => {
  const onClose = jest.fn();
  render(
    <Dialog title="Test Title" onClose={onClose}>
      <div>Test child</div>
    </Dialog>
  );

  expect(screen.getByText('TEST TITLE')).toBeInTheDocument();
  expect(screen.getByText('Test child')).toBeInTheDocument();
});

test('calls onClose prop when close button is clicked', () => {
    const onClose = jest.fn();
    render(
        <Dialog title="Test Title" onClose={onClose}>
        <button>Test Button</button>
        </Dialog>
    );

    fireEvent.click(screen.getByRole('button',{ name: /×/ }));
    expect(onClose).toHaveBeenCalledTimes(1);
});
