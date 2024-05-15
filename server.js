// server.js
const express = require('express');
const app = express();
const pool = require('./db'); // Import the pool variable from db.js
const PORT = process.env.PORT || 3000;

app.use(express.json());


//These are the CRUD functionalities for the books

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

// Create a new book
app.post('/books', async (req, res) => {
    try {
        const { title, author, published_year, genre, available } = req.body;
        const newBook = await pool.query(
            'INSERT INTO Books (title, author, published_year, genre, available) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, author, published_year, genre, available]
        );
        res.status(201).json(newBook.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Update a book
app.put('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, published_year, genre, available } = req.body;
        const updatedBook = await pool.query(
            'UPDATE Books SET title = $1, author = $2, published_year = $3, genre = $4, available = $5 WHERE book_id = $6 RETURNING *',
            [title, author, published_year, genre, available, id]
        );
        if (updatedBook.rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(updatedBook.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await pool.query(
            'DELETE FROM Books WHERE book_id = $1 RETURNING *',
            [id]
        );
        if (deletedBook.rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

//These are the CRUD functionalities for the users

// Get all users
app.get('/users', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM Users');
      res.json(rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
});

// Create a new user
app.post('/users', async (req, res) => {
    try {
        const { first_name, last_name, email, role } = req.body;
        const newUser = await pool.query(
            'INSERT INTO Users (first_name, last_name, email, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [first_name, last_name, email, role]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Update a user
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, role } = req.body;
        const updatedUser = await pool.query(
            'UPDATE Users SET first_name = $1, last_name = $2, email = $3, role = $4 WHERE user_id = $5 RETURNING *',
            [first_name, last_name, email, role, id]
        );
        if (updatedUser.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});


// Delete a user
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await pool.query(
            'DELETE FROM Users WHERE user_id = $1 RETURNING *',
            [id]
        );
        if (deletedUser.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

//These are the CRUD functionalities for the backpack 

// Get all book checkouts
app.get('/book-checkouts', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM book_checkouts');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Create a new book checkout
app.post('/book-checkouts', async (req, res) => {
    try {
        const { user_id, book_id, checkout_date } = req.body;
        const newCheckout = await pool.query(
            'INSERT INTO book_checkouts (user_id, book_id, checkout_date) VALUES ($1, $2, $3) RETURNING *',
            [user_id, book_id, checkout_date]
        );
        res.status(201).json(newCheckout.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Update a book checkout
app.put('/book-checkouts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, book_id, checkout_date, return_date, returned } = req.body;
        const updatedCheckout = await pool.query(
            'UPDATE book_checkouts SET user_id = $1, book_id = $2, checkout_date = $3, return_date = $4, returned = $5 WHERE checkout_id = $6 RETURNING *',
            [user_id, book_id, checkout_date, return_date, returned, id]
        );
        if (updatedCheckout.rows.length === 0) {
            return res.status(404).json({ error: 'Book checkout not found' });
        }
        res.json(updatedCheckout.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Delete a book checkout
app.delete('/book-checkouts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCheckout = await pool.query(
            'DELETE FROM book_checkouts WHERE checkout_id = $1 RETURNING *',
            [id]
        );
        if (deletedCheckout.rows.length === 0) {
            return res.status(404).json({ error: 'Book checkout not found' });
        }
        res.json({ message: 'Book checkout deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});





// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
