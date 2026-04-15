const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

const connectDB = require('./db');
connectDB();

const Menu = require('./models/Menu');
const Order = require('./models/Order');
const User = require('./models/User');

app.use(cors());
app.use(express.json());

// ---------------- LOGIN ----------------
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      role: user.role   // ✅ THIS IS KEY
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});

// ---------------- MENU ----------------
app.get('/menu', async (req, res) => {
  const items = await Menu.find();
  res.json(items);
});

// ---------------- ADD FOOD (ADMIN) ----------------
app.post('/add-menu', async (req, res) => {
  const { name, price } = req.body;

  const newItem = new Menu({ name, price });
  await newItem.save();

  res.json({ message: "Food added" });
});

// ---------------- DELETE FOOD ----------------
app.delete('/menu/:id', async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting food" });
  }
});

// ---------------- PLACE ORDER ----------------
app.post('/order', async (req, res) => {
  const { items } = req.body;

  const total = items.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const order = new Order({ items, total });
  await order.save();

  res.json({ message: "Order placed successfully" });
});

// ---------------- GET ORDERS ----------------
app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// ---------------- START ----------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});