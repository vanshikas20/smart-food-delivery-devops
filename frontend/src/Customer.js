import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function Customer() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();
  const API_URL = "http://localhost:8080";

  const images = {
    Pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    Burger: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    Pasta: "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9"
  };

  const loadMenu = async () => {
    const res = await fetch(`${API_URL}/menu`);
    const data = await res.json();
    setMenu(data);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const goToCheckout = () => {
    navigate("/checkout", { state: { cart } });
  };

  return (
    <div>
      <div className="navbar">🍔 Food Menu</div>

      <div className="container">
        <button onClick={loadMenu}>Load Menu</button>

        <div className="menu-container">
          {menu.map((item) => (
            <div className="card" key={item._id}>
              <img src={images[item.name]} alt="" />
              <div className="card-content">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <button onClick={() => addToCart(item)}>Add</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart">
          <h2>Cart</h2>

          {cart.map((item, i) => (
            <p key={i}>{item.name} - ₹{item.price}</p>
          ))}

          <h3>
            Total ₹{cart.reduce((sum, i) => sum + i.price, 0)}
          </h3>

          {cart.length > 0 && (
            <button onClick={goToCheckout}>Place Order</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Customer;