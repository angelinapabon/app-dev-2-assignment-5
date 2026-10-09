import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';

// ProductCard has <Link>s, so it also needs a Router around it
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ProductCard', () => {
  // Fake product data to pass in as a prop
  const product = {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://placehold.co/600x400',
    description: 'Premium noise-cancelling headphones',
  };

  // vi.fn() makes a fake function, just a placeholder for onAddToCart
  const defaultProps = { product, onAddToCart: vi.fn() };

  // does it render at all?
  test('renders without crashing', () => {
    renderWithRouter(<ProductCard {...defaultProps} />);
  });

  // Checks that the props show up on screen (price is formatted with toFixed(2))
  test('displays product information', () => {
    renderWithRouter(<ProductCard {...defaultProps} />);

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Premium noise-cancelling headphones')).toBeInTheDocument();
  });

  // The /add to cart/ part is a case-insensitive match on the button's name
  test('contains an Add to Cart button', () => {
    renderWithRouter(<ProductCard {...defaultProps} />);

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  //click the button and check the fake function was called
  test('calls onAddToCart with the product when clicked', () => {
    const mockAdd = vi.fn();
    renderWithRouter(<ProductCard product={product} onAddToCart={mockAdd} />);

    fireEvent.click(screen.getByRole('button', { name: /add to cart/i })); // simulate a click

    expect(mockAdd).toHaveBeenCalledWith(product); // called with the right product
    expect(mockAdd).toHaveBeenCalledTimes(1);      // and only once
  });
});