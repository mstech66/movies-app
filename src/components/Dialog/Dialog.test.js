import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Dialog from './Dialog';

// test('renders Dialog without crashing', () => {
//   const onClose = jest.fn();
//   render(<Dialog onClose={onClose} />);
// });

beforeEach(()=>{
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
});

afterEach(()=>{
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
})

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

// test('calls onClose prop when close button is clicked', () => {
//   const onClose = jest.fn();
//   render(<Dialog title="Test Title" onClose={onClose} />);
  
//   fireEvent.click(screen.getByText('×'));
//   expect(onClose).toHaveBeenCalledTimes(1);
// });