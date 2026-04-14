import React, { useState } from "react";
import "./App.css";

function App() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  const API_URL = "http://localhost:8080";

  const loadMenu = async () => {
    try {
      const res = await fetch(`${API_URL}/menu`);
      const data = await res.json();
      console.log("Menu Data:", data);
      setMenu([...data]);   // ✅ important fix
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const images = {
  Pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  Burger: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  Pasta: "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9"
};

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const placeOrder = async () => {
    try {
      const res = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart }),
      });

      const data = await res.json();
      alert(data.message);
      setCart([]);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
  <div className="container">
    <h1>🍔 Smart Food Delivery</h1>

    <div style={{ textAlign: "center" }}>
      <button onClick={loadMenu}>Load Menu</button>
    </div>

    <h2 style={{ textAlign: "center" }}>Menu</h2>

    <div className="menu-container">
      {menu.map((item) => (
        <div className="card" key={item._id}>
          <img
  src={images[item.name]}
  alt={item.name}
/>
          <div className="card-content">
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>

    <div className="cart">
      <h2>Cart 🛒</h2>

      {cart.length === 0 ? <p>No items</p> : null}

      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ₹{item.price}
          </li>
        ))}
      </ul>

      <h3>Total: ₹{getTotal()}</h3>

      {cart.length > 0 && (
        <button onClick={placeOrder}>Place Order</button>
      )}
    </div>
  </div>
);
}

export default App;