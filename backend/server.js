const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Smart Food Delivery Backend Running!');
});

// Menu API
app.get('/menu', (req, res) => {
    res.json([
        { id: 1, name: "Pizza", price: 200 },
        { id: 2, name: "Burger", price: 100 }
    ]);
});

// Order API
app.post('/order', (req, res) => {
    res.json({
        message: "Order placed successfully",
        order: req.body
    });
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;