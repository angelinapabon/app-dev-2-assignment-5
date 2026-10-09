import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../CartItem';

describe('CartItem', () => {
  // Fake cart item to pass in as a prop
  const item = {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
  };

  // vi.fn() makes a fake function, used here as a placeholder for onRemove
  const defaultProps = { item, onRemove: vi.fn() };

  //passes if rendering doesn't throw an error
  test('renders without crashing', () => {
    render(<CartItem {...defaultProps} />);
  });

  // Checks that the item's name and price show on screen
  // (price is formatted with toFixed(2) and a $ sign)
  test('displays item information', () => {
    render(<CartItem {...defaultProps} />);

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  // Finds the button by its role and name to confirm it exists
  test('contains a Remove button', () => {
    render(<CartItem {...defaultProps} />);

    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
  });

  //click Remove and check the fake function was called
  test('calls onRemove when the remove button is clicked', () => {
    const mockRemove = vi.fn();
    render(<CartItem item={item} onRemove={mockRemove} />);

    fireEvent.click(screen.getByRole('button', { name: /remove/i })); // simulate a click

    expect(mockRemove).toHaveBeenCalledTimes(1); // called exactly once
  });
});