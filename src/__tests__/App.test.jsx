import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// A fake localStorage made of mock functions, so we can control what it
// returns and check what the app tried to save
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
// Swap the browser's real localStorage for our fake one
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('App localStorage Integration', () => {
  // Runs before every test so one test's calls don't affect the next
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
    // App uses BrowserRouter, so reset the URL to "/" for each test
    window.history.pushState({}, '', '/');
  });

  // Empty storage (null) means the app should start fine with an empty cart
  test('renders without crashing', () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<App />);
    expect(screen.getByText('Discover Premium Tech')).toBeInTheDocument();
  });

  // Pretend a cart was saved earlier, then check the app loaded it
  test('loads cart from localStorage on mount', () => {
    const savedCart = JSON.stringify([
      { id: 1, name: 'Wireless Headphones', price: 99.99 },
    ]);
    localStorageMock.getItem.mockReturnValue(savedCart);

    render(<App />);

    expect(localStorageMock.getItem).toHaveBeenCalledWith('gadgetgrove-cart'); // used the right key
    // The header count proves the saved item made it into state
    expect(screen.getByText(/Cart \(1\)/)).toBeInTheDocument();
  });

  // useEffect saves the cart on the first render, so we check setItem was called
  test('saves cart to localStorage when it changes', async () => {
    localStorageMock.getItem.mockReturnValue('[]');

    render(<App />);

    // waitFor retries until the useEffect has run
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('gadgetgrove-cart', '[]');
    });
  });

  // Full flow: go to Products, add an item, confirm it gets saved
  test('saves a new item after Add to Cart is clicked', async () => {
    localStorageMock.getItem.mockReturnValue('[]');

    render(<App />);

    fireEvent.click(screen.getByRole('link', { name: 'Products' }));                    // navigate
    fireEvent.click(screen.getAllByRole('button', { name: /add to cart/i })[0]);        // click first button

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'gadgetgrove-cart',
        expect.stringContaining('Wireless Headphones') // saved string includes the product
      );
    });
    expect(screen.getByText(/Cart \(1\)/)).toBeInTheDocument(); // header count updated too
  });
});