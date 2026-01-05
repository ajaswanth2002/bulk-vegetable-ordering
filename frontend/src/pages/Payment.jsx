import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Payment.css";
import { toast } from "react-toastify";
function Payment({ cart, setCart, products }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState("COD");

  const cartItems = products.filter(
    (item) => cart[item.id] && cart[item.id] > 0
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * cart[item.id],
    0
  );

  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

const placeOrder = () => {
  if (!name || !phone || !address) {
    toast.error("Please fill all details");
    return;
  }

  toast.success("Order placed successfully");

  // navigate after toast (2 seconds)
  setTimeout(() => {
    navigate("/");
  }, 2000);
};

  return (
    <div className="payment-container">
      <h2>Payment & Delivery</h2>

      {/* CUSTOMER DETAILS */}
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <textarea
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      {/* PAYMENT METHOD */}
      <h3>Payment Method</h3>

      <label>
        <input
          type="radio"
          checked={method === "COD"}
          onChange={() => setMethod("COD")}
        />
        Cash on Delivery
      </label>

      <label>
        <input
          type="radio"
          checked={method === "UPI"}
          onChange={() => setMethod("UPI")}
        />
        UPI
      </label>

      <label>
        <input
          type="radio"
          checked={method === "CARD"}
          onChange={() => setMethod("CARD")}
        />
        Card
      </label>

      {/* ORDER SUMMARY */}
      <div className="pay-summary-box">
        <h3>Order Summary</h3>

        {cartItems.map((item) => (
          <div key={item.id} className="summary-row">
  {/* LEFT SIDE */}
  <div className="item-left">
    <div className="item-name">
      {item.name} <span className="item-mult">× {cart[item.id]}</span>
    </div>

    <div className="qty-controls">
      <button
        onClick={() =>
          setCart((prev) => ({
            ...prev,
            [item.id]: Math.max(prev[item.id] - 1, 1),
          }))
        }
      >
        −
      </button>

      <span className="qty-number">{cart[item.id]}</span>

      <button
        onClick={() =>
          setCart((prev) => ({
            ...prev,
            [item.id]: prev[item.id] + 1,
          }))
        }
      >
        +
      </button>
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="item-total">
    ₹{item.price * cart[item.id]}
  </div>
</div>
        ))}

        <div className="summary-row">
          <strong>GST</strong>
          <strong>₹{gst}</strong>
        </div>

        <div className="summary-total">
          <strong>TO PAY</strong>
          <strong>₹{total}</strong>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="payment-actions">
        <button className="back-btn" onClick={() => navigate("/cart")}>
          ← Back to Cart
        </button>

        <button className="pay-btn" onClick={placeOrder}>
          PAY & PLACE ORDER
        </button>
      </div>
    </div>
  );
}

export default Payment;