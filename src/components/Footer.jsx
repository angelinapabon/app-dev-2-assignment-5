import './Footer.css';

function Footer({
  storeName = 'GadgetGrove',
  email = 'hello@gadgetgrove.com',
  phone = '(555) 123-4567',
  address = '123 Innovation Ave, Tech City, TC 90210',
}) {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-section">
          <h3 className="footer-heading">{storeName}</h3>
          <p className="footer-text">
            Premium tech gadgets curated for modern living. Quality you can trust.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subheading">Shop</h4>
          <ul className="footer-links">
            <li><a href="#products">All Products</a></li>
            <li><a href="#new">New Arrivals</a></li>
            <li><a href="#deals">Deals</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subheading">Support</h4>
          <ul className="footer-links">
            <li><a href="#help">Help Center</a></li>
            <li><a href="#shipping">Shipping</a></li>
            <li><a href="#returns">Returns</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subheading">Contact</h4>
          <p className="footer-text">{email}</p>
          <p className="footer-text">{phone}</p>
          <p className="footer-text">{address}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {storeName}. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;