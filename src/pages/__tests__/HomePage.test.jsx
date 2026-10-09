import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';

// HomePage contains Hero, which uses a <Link>.
// Links only work inside a Router, so this wraps the component in one.
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('HomePage', () => {
  //passes if rendering doesn't throw an error
  test('renders without crashing', () => {
    renderWithRouter(<HomePage />);
  });

  // Checks that the main text is actually on the screen
  test('displays main content', () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByText('Discover Premium Tech')).toBeInTheDocument();
    expect(screen.getByText('Why Shop with Us?')).toBeInTheDocument();
    expect(screen.getByText('Curated, quality products')).toBeInTheDocument();
  });

  // Finds the hero button by its role (link) and name, then checks where it points
  test('has a link to the products page', () => {
    renderWithRouter(<HomePage />);

    const link = screen.getByRole('link', { name: /shop the collection/i });
    expect(link).toHaveAttribute('href', '/products');
  });
});
