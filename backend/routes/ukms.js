// routes/ukms.js - UKM route handlers
const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * GET /api/ukms
 * Returns all UKMs ordered by id ascending
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ukms ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching UKMs:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/ukms/:id
 * Returns a single UKM by its id; 404 if not found
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate that id is a positive integer
  if (!Number.isInteger(Number(id)) || Number(id) < 1) {
    return res.status(400).json({ error: 'Invalid UKM id' });
  }

  try {
    const result = await pool.query('SELECT * FROM ukms WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: `UKM with id ${id} not found` });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error fetching UKM ${id}:`, err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
