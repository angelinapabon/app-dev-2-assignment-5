import ProductCard from '../components/ProductCard';

// Receives products and addToCart as props, renders the product grid from App.jsx
function ProductsPage({ products, addToCart }) {
  return (
    <main className="main-content">
      <h2 className="section-title">Featured Products</h2>
      <p className="section-subtitle">
        Hand-picked essentials for the modern tech enthusiast
      </p>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </main>
  );
}

export default ProductsPage;