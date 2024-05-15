// server.js
const express = require('express');
const app = express();
const pool = require('./db'); // Import the pool variable from db.js
const PORT = process.env.PORT || 3000;

app.use(express.json());


// Get all books
app.get('/books', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM Books');
      res.json(rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
