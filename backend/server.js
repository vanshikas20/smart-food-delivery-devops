const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// DB
const connectDB = require('./db');
connectDB();

// Models
const Menu = require('./models/Menu');
const Order = require('./models/Order');

// Middleware
app.use(cors());          // ✅ VERY IMPORTANT
app.use(express.json());

// Home
app.get('/', (req, res) => {
  res.send('Smart Food Delivery Backend Running!');
});

// Get Menu
app.get('/menu', async (req, res) => {
  try {
    const items = await Menu.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

// Add Menu (run once)
app.get('/add-menu', async (req, res) => {
  try {
    await Menu.insertMany([
      { name: "Pizza", price: 200 },
      { name: "Burger", price: 100 },
      { name: "Pasta", price: 150 }
    ]);
    res.send("Menu added successfully");
  } catch (error) {
    res.status(500).send("Error adding menu");
  }
});

// Place Order
app.post('/order', async (req, res) => {
  try {
    const { items } = req.body;

    const total = items.reduce((sum, item) => sum + item.price, 0);

    const newOrder = new Order({ items, total });
    await newOrder.save();

    res.json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Get Orders
app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});