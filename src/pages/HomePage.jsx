import Hero from '../components/Hero';

// Hero moved here from App.jsx and "Why Shop with Us?" intro
function HomePage() {
  return (
    <>
      <Hero
        title="Discover Premium Tech"
        subtitle="Curated gadgets that elevate your everyday. Free shipping on orders over $50."
        ctaText="Shop the Collection"
        backgroundImage="https://placehold.co/1200x400/1d1d1f/ffffff?text=GadgetGrove+Premium+Tech"
      />
      <main className="main-content">
        <h2 className="section-title">Why Shop with Us?</h2>
        <p className="section-subtitle">
          GadgetGrove brings you hand-picked tech essentials, fast shipping, and easy returns.
        </p>
        <p>Curated, quality products</p>
        <p>Free shipping on orders over $50</p>
        <p>30-day hassle-free returns</p>
      </main>
    </>
  );
}

export default HomePage;