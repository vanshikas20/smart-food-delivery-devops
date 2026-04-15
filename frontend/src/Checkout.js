import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";

function Checkout() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.cart || []);

  const increase = (i) => {
    const newCart = [...cart];
    newCart[i].qty = (newCart[i].qty || 1) + 1;
    setCart(newCart);
  };

  const decrease = (i) => {
    const newCart = [...cart];
    if ((newCart[i].qty || 1) > 1) newCart[i].qty--;
    setCart(newCart);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const confirmOrder = async () => {
  await fetch("http://localhost:8080/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items: cart }),
  });

  alert("Order Confirmed 🎉");
};

  return (
    <div>
      <div className="navbar">Checkout</div>

      <div className="container">
        {cart.map((item, i) => (
          <div key={i}>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <button onClick={() => decrease(i)}>-</button>
            {item.qty || 1}
            <button onClick={() => increase(i)}>+</button>
          </div>
        ))}

        <h2>Total: ₹{total}</h2>

        <button onClick={confirmOrder}>
  Confirm Order
</button>
      </div>
    </div>
  );
}

export default Checkout;