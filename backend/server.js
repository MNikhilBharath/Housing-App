// server.js - Backend using Express and SQLite

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Set up path to the local SQLite database file
const dbFile = path.join(__dirname, 'housing.db');
const db = new sqlite3.Database(dbFile);

// Initialize listings table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS listings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      rent INTEGER NOT NULL,
      address TEXT NOT NULL,
      number_of_rooms INTEGER NOT NULL,
      contact_info TEXT NOT NULL
    )
  `);
});

// Middleware to parse incoming JSON
app.use(express.json());

// Endpoint to create a new listing
app.post('/api/listings', (req, res) => {
  const { title, description, rent, address, number_of_rooms, contact_info } = req.body;

  // Simple check for required fields
  if (![title, description, rent, address, number_of_rooms, contact_info].every(Boolean)) {
    return res.status(400).send('Missing required fields in request.');
  }

  const sql = `
    INSERT INTO listings (title, description, rent, address, number_of_rooms, contact_info)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [title, description, rent, address, number_of_rooms, contact_info];

  db.run(sql, values, function (err) {
    if (err) {
      console.error('Failed to insert listing:', err.message);
      return res.status(500).send('Something went wrong while saving the listing.');
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Endpoint to retrieve all listings
app.get('/api/listings', (req, res) => {
  const sql = 'SELECT * FROM listings';

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Failed to fetch listings:', err.message);
      return res.status(500).send('Could not retrieve listings.');
    }
    res.json(rows);
  });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
