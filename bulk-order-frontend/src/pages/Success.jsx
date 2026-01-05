function Success() {
  const orderId = Math.floor(100000 + Math.random() * 900000);

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Your Order ID</p>
      <h1>#{orderId}</h1>
      <p>Thank you for ordering with us 😊</p>
    </div>
  );
}

export default Success;