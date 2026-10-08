// CartItem.jsx
// Component that displays a single item inside the shopping cart

import './CartItem.css';

function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      
      {/* Product Name */}
      <p className="cart-item-name">{item.name}</p>

      {/* Product Price */}
      <p className="cart-item-price">${item.price.toFixed(2)}</p>

      {/* Remove Button */}
      <button 
        className="remove-btn" 
        type="button"
        onClick={onRemove}
      >
        Remove
      </button>

    </div>
  );
}

export default CartItem;