// routes/sessions.js - Route handlers for Match Making Badminton sessions
const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * GET /api/sessions
 * Returns all sessions ordered by created_at descending,
 * with aggregated matches and match counts.
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id,
        s.sport_type,
        s.session_name,
        s.game_format,
        s.court_count,
        s.total_players,
        s.players,
        s.duration_seconds,
        s.created_at,
        COUNT(sm.id)::int AS total_matches,
        COALESCE(
          json_agg(
            json_build_object(
              'id', sm.id,
              'match_number', sm.match_number,
              'court_number', sm.court_number,
              'team_a_name', sm.team_a_name,
              'team_b_name', sm.team_b_name,
              'score_a', sm.score_a,
              'score_b', sm.score_b,
              'status', sm.status
            ) ORDER BY sm.match_number
          ) FILTER (WHERE sm.id IS NOT NULL), '[]'::json
        ) AS matches
      FROM sessions s
      LEFT JOIN session_matches sm ON s.id = sm.session_id
      GROUP BY s.id
      ORDER BY s.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching sessions:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/sessions/:id
 * Returns a single session with all its matches
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sessionRes = await pool.query(
      'SELECT * FROM sessions WHERE id = $1',
      [id]
    );

    if (sessionRes.rows.length === 0) {
      return res.status(404).json({ error: `Session with id ${id} not found` });
    }

    const matchesRes = await pool.query(
      'SELECT * FROM session_matches WHERE session_id = $1 ORDER BY match_number ASC',
      [id]
    );

    const session = sessionRes.rows[0];
    session.matches = matchesRes.rows;
    session.total_matches = matchesRes.rows.length;

    res.json(session);
  } catch (err) {
    console.error(`Error fetching session ${id}:`, err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/sessions
 * Saves a completed Match Making session and its matches
 * Body: {
 *   sport_type,
 *   session_name,
 *   game_format,
 *   court_count,
 *   total_players,
 *   players, // Array of string names
 *   duration_seconds,
 *   matches: [ { match_number, court_number, team_a_name, team_b_name, score_a, score_b, status } ]
 * }
 */
router.post('/', async (req, res) => {
  const {
    sport_type = 'Badminton',
    session_name = 'Sesi Mabar Badminton',
    game_format = 'Double',
    court_count = 1,
    total_players,
    players = [],
    duration_seconds = 0,
    matches = [],
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const calculatedTotalPlayers =
      total_players || (Array.isArray(players) ? players.length : 0);

    // 1. Insert session record
    const sessionRes = await client.query(
      `INSERT INTO sessions (
        sport_type,
        session_name,
        game_format,
        court_count,
        total_players,
        players,
        duration_seconds
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        sport_type,
        session_name,
        game_format,
        court_count,
        calculatedTotalPlayers,
        JSON.stringify(players),
        duration_seconds,
      ]
    );

    const newSession = sessionRes.rows[0];
    const insertedMatches = [];

    // 2. Insert all matches associated with this session
    if (Array.isArray(matches) && matches.length > 0) {
      for (let i = 0; i < matches.length; i++) {
        const m = matches[i];
        const matchRes = await client.query(
          `INSERT INTO session_matches (
            session_id,
            match_number,
            court_number,
            team_a_name,
            team_b_name,
            score_a,
            score_b,
            status
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *`,
          [
            newSession.id,
            m.match_number || i + 1,
            m.court_number || 1,
            m.team_a_name || 'Tim A',
            m.team_b_name || 'Tim B',
            m.score_a || 0,
            m.score_b || 0,
            m.status || 'finished',
          ]
        );
        insertedMatches.push(matchRes.rows[0]);
      }
    }

    await client.query('COMMIT');

    newSession.matches = insertedMatches;
    newSession.total_matches = insertedMatches.length;

    res.status(201).json(newSession);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating session:', err.message);
    res.status(500).json({ error: 'Failed to save session' });
  } finally {
    client.release();
  }
});

module.exports = router;

