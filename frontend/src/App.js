import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import products from "./data/products";

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} products={products} />}
        />
        <Route
          path="/payment"
          element={<Payment cart={cart} setCart={setCart} products={products} />}
        />
      </Routes>
    </>
  );
}

export default App;
