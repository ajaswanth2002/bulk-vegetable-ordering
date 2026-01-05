import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

function Cart({ cart, setCart, products }) {
  const navigate = useNavigate();

  const cartItems = products.filter(
    (item) => cart[item.id] && cart[item.id] > 0
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * cart[item.id],
    0
  );

  const gst = Math.round(subtotal * 0.05); // 5%
  const total = subtotal + gst;

  const increaseQty = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[id] > 1) copy[id] -= 1;
      else delete copy[id];
      return copy;
    });
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          {/* HEADER */}
          <div className="cart-header">
            <span>Item</span>
            <span>Price</span>
            <span>Qty</span>
            <span>Total</span>
            <span>Remove</span>
          </div>

          {/* ITEMS */}
          {cartItems.map((item) => (
            <div className="cart-row" key={item.id}>
              <div className="item-info">
                <img src={item.img} alt={item.name} />
                <span>{item.name}</span>
              </div>

              <span>₹{item.price}</span>

              <div className="qty-controls">
                <button onClick={() => decreaseQty(item.id)}>−</button>
                <span>{cart[item.id]}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <span>₹{item.price * cart[item.id]}</span>

              <button
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                ×
              </button>
            </div>
          ))}

          {/* ADD MORE ITEMS */}
          <div className="add-more">
            <span>➕ Any more items to add?</span>
            <button onClick={() => navigate("/")}>
              Browse Products
            </button>
          </div>

          {/* BILL */}
          <div className="bill-box">
            <div className="bill-row">
              <span>Item Total</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="bill-row">
              <span>Delivery Fee</span>
              <span className="free">FREE</span>
            </div>

            <div className="bill-row">
              <span>GST & Charges</span>
              <span>₹{gst}</span>
            </div>

            <div className="bill-total">
              <span>TO PAY</span>
              <span>₹{total}</span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="cart-actions">
              <button
                className="back-btn"
                onClick={() => navigate("/")}
              >
                ← Back
              </button>

              <button
                className="checkout-btn"
                onClick={() => navigate("/payment")}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;