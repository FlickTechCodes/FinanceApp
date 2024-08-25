const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Sample data (Replace this with database integration later)
let stocks = [
    { id: 1, symbol: 'AAPL', name: 'Apple Inc.' },
    { id: 2, symbol: 'MSFT', name: 'Microsoft Corp.' }
];

// GET /stocks - Retrieve all stocks
app.get('/stocks', (req, res) => {
    res.json(stocks); // Use the global stocks array
});

// POST /stocks - Add a new stock
app.post('/stocks', (req, res) => {
    const newStock = { id: stocks.length + 1, ...req.body };
    stocks.push(newStock);
    res.status(201).json(newStock);
});

// GET /stocks/:id - Retrieve a specific stock
app.get('/stocks/:id', (req, res) => {
    const stock = stocks.find(s => s.id === parseInt(req.params.id));
    if (!stock) return res.status(404).json({ message: 'Stock not found' });
    res.json(stock);
});

// PUT /stocks/:id - Update a specific stock
app.put('/stocks/:id', (req, res) => {
    const stock = stocks.find(s => s.id === parseInt(req.params.id));
    if (!stock) return res.status(404).json({ message: 'Stock not found' });

    // Update stock details (For example, only updating the name here)
    stock.name = req.body.name;
    res.json(stock);
});

// DELETE /stocks/:id - Delete a specific stock
app.delete('/stocks/:id', (req, res) => {
    const stockIndex = stocks.findIndex(s => s.id === parseInt(req.params.id));
    if (stockIndex === -1) return res.status(404).json({ message: 'Stock not found' });

    stocks.splice(stockIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
