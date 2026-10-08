// Routing setup and cart state management
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

// Products live outside App
const products = [
  { id: 1, name: "Wireless Headphones", price: 99.99, image: "https://placehold.co/600x400", description: "Premium noise-cancelling headphones with 30-hour battery life" },
  { id: 2, name: "Smart Watch", price: 249.99, image: "https://placehold.co/600x400", description: "Fitness tracker with heart rate monitor and GPS" },
  { id: 3, name: "Bluetooth Speaker", price: 79.99, image: "https://placehold.co/600x400", description: "Portable waterproof speaker with 360-degree sound" },
  { id: 4, name: "Laptop Stand", price: 49.99, image: "https://placehold.co/600x400", description: "Ergonomic aluminum stand for laptops and tablets" },
  { id: 5, name: "Webcam", price: 129.99, image: "https://placehold.co/600x400", description: "4K webcam with auto-focus and noise reduction" },
  { id: 6, name: "Mechanical Keyboard", price: 159.99, image: "https://placehold.co/600x400", description: "RGB backlit keyboard with custom switches" }
];

function App() {
  // Load the cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('gadgetgrove-cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.warn('Could not load cart from localStorage:', error);
      return [];
    }
  });

  // Save the cart to localStorage every time it changes
  useEffect(() => {
    try {
      localStorage.setItem('gadgetgrove-cart', JSON.stringify(cart));
    } catch (error) {
      console.warn('Could not save cart to localStorage:', error);
    }
  }, [cart]);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  function removeFromCart(indexToRemove) {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    // BrowserRouter wraps the whole app
    <BrowserRouter>
      <div className="app">
        {/* Header and Footer are outside Routes so they show on every page */}
        <Header storeName="GadgetGrove" cartCount={cart.length} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage products={products} addToCart={addToCart} />} />
          {/* Dynamic route, id matches product1, product2, etc*/}
          <Route path="/product/:id" element={<ProductDetailPage products={products} addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} total={total} />} />
        </Routes>

        <Footer storeName="GadgetGrove" email="hello@gadgetgrove.com" />
      </div>
    </BrowserRouter>
  );
}

export default App;