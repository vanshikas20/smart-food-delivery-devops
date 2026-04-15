import React, { useState, useEffect } from "react";
import "./App.css";

function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [menu, setMenu] = useState([]);

  const API_URL = "http://localhost:8080";

  // Load menu
  const loadMenu = async () => {
    const res = await fetch(`${API_URL}/menu`);
    const data = await res.json();
    setMenu(data);
  };

  // Add food
  const addFood = async () => {
    await fetch(`${API_URL}/add-menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price }),
    });

    alert("Food Added!");
    loadMenu(); // refresh list
  };

  // Delete food
  const deleteFood = async (id) => {
    await fetch(`${API_URL}/menu/${id}`, {
      method: "DELETE",
    });

    alert("Food Deleted!");
    loadMenu(); // refresh list
  };

  // Load on page open
  useEffect(() => {
    loadMenu();
  }, []);

  return (
    <div>
      <div className="navbar">Admin Panel</div>

      <div className="admin-box">
        <h2>Add Food Item</h2>

        <input
          placeholder="Food Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <br /><br />

        <button onClick={addFood}>Add Food</button>
      </div>

      <div className="container">
        <h2>Menu Items</h2>

        {menu.map((item) => (
          <div key={item._id} style={{ marginBottom: "10px" }}>
            {item.name} - ₹{item.price}

            <button
              style={{ marginLeft: "10px", background: "red" }}
              onClick={() => deleteFood(item._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;