import './ProductCard.css';
import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      {/* Image links to the detail page */}
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div className="product-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>
      </Link>

      <div className="product-info">
        {/* Name also links to the detail page */}
        <Link
          to={`/product/${product.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">
            ${product.price.toFixed(2)}
          </span>

          {/*Add to Cart stays outside the links so it doesn't navigate*/}
          <button
            className="add-to-cart-btn"
            type="button"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;