import { useEffect, useState } from "react";
import productsData from "../data/products";
import heroImages from "../data/heroImages";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home({ cart, setCart }) {
  const [category, setCategory] = useState("vegetable");
  const [heroIndex, setHeroIndex] = useState(0);
  const navigate = useNavigate();

  const heroImageList = [heroImages.vegetable, heroImages.fruit];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = productsData.filter(
    (p) => p.category === category
  );

  return (
    <>
      {/* HERO */}
      <div
        className="hero"
        style={{ backgroundImage: `url(${heroImageList[heroIndex]})` }}
      >
        <div className="hero-overlay">
          <h1>Bulk Vegetable & Fruit Ordering</h1>
          <p>Fresh • Wholesale • Direct from Market</p>
        </div>
      </div>

      {/* FILTER */}
      <div className="filter-section">
        <button
          className={category === "vegetable" ? "active" : ""}
          onClick={() => setCategory("vegetable")}
        >
          Vegetables
        </button>
        <button
          className={category === "fruit" ? "active" : ""}
          onClick={() => setCategory("fruit")}
        >
          Fruits
        </button>
      </div>

      {/* PRODUCTS */}
      <div className="home">
        <div className="grid">
          {filteredProducts.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <p>₹{item.price} / kg</p>

              <div className="cart-controls">
                <button
                  onClick={() =>
                    setCart((c) => ({
                      ...c,
                      [item.id]: Math.max((c[item.id] || 0) - 1, 0),
                    }))
                  }
                >
                  −
                </button>
                <span>{cart[item.id] || 0}</span>
                <button
                  onClick={() =>
                    setCart((c) => ({
                      ...c,
                      [item.id]: (c[item.id] || 0) + 1,
                    }))
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="go-to-cart"
          onClick={() => navigate("/cart")}
        >
          🛒 Go to Cart (
          {Object.values(cart).reduce((a, b) => a + b, 0)})
        </button>
      </div>
    </>
  );
}

export default Home;