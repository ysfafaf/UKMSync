// routes/matches.js - Match route handlers
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Allowed sport types for validation
const VALID_SPORT_TYPES = ['Badminton', 'Basket', 'Voli', 'Futsal'];

/**
 * GET /api/matches
 * Returns all matches ordered by match_date descending (newest first)
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM matches ORDER BY match_date DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching matches:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/matches
 * Creates a new match record.
 * Body: { sport_type, team_a_name, team_b_name, score_a, score_b }
 * Validates that sport_type is one of: Badminton, Basket, Voli, Futsal
 */
router.post('/', async (req, res) => {
  const { sport_type, team_a_name, team_b_name, score_a = 0, score_b = 0 } = req.body;

  // --- Validation ---
  if (!sport_type || !team_a_name || !team_b_name) {
    return res.status(400).json({
      error: 'sport_type, team_a_name, and team_b_name are required',
    });
  }

  if (!VALID_SPORT_TYPES.includes(sport_type)) {
    return res.status(400).json({
      error: `Invalid sport_type. Must be one of: ${VALID_SPORT_TYPES.join(', ')}`,
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO matches (sport_type, team_a_name, team_b_name, score_a, score_b)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [sport_type, team_a_name, team_b_name, score_a, score_b]
    );

    // Return 201 Created with the new match record
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating match:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
