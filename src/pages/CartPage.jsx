import CartItem from '../components/CartItem';

// Cart section moved from old App.jsx.
function CartPage({ cart, removeFromCart, total }) {
  return (
    <section className="cart-section">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <CartItem
              key={`${item.id}-${index}`}
              item={item}
              onRemove={() => removeFromCart(index)}
            />
          ))}
          <p className="cart-total">Total: ${total.toFixed(2)}</p>
        </>
      )}
    </section>
  );
}

export default CartPage;