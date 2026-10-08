import './Header.css';
// Link replaces <a> tags so navigation doesn't reload the page
import { Link } from 'react-router-dom';

function Header({ storeName = 'GadgetGrove', cartCount }) {
  return (
    <header className="app-header">
      <div className="header-inner">

        {/*Store Logo and Title*/}
        <h1 className="logo">🛒 {storeName}</h1>

        {/*Nav Menu, links match the routes defined in App.jsx*/}
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
        </nav>

        {/*Cart icon is a Link to cart (keeps the cart-btn class for styling)*/}
        <Link to="/cart" className="cart-btn">
          🛒 Cart ({cartCount})
        </Link>
      </div>
    </header>
  );
}

export default Header;
