import { useParams, Link } from 'react-router-dom';

function ProductDetailPage({ products, addToCart }) {
  // useParams returns the id from the URL as a string 
  const { id } = useParams();
  // Convert to a number with parseInt so it matches product id
  const product = products.find((p) => p.id === parseInt(id));

  // Handle a missing product
  if (!product) {
    return (
      <main className="main-content">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/products">Back to Products</Link>
      </main>
    );
  }

  return (
    <main className="main-content">
      <img src={product.image} alt={product.name} style={{ maxWidth: '100%' }} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button className="add-to-cart-btn" type="button" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      <p><Link to="/products">← Back to Products</Link></p>
    </main>
  );
}

export default ProductDetailPage;