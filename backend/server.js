// server.js - UKMSync API main entry point
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Import route modules
const ukmsRouter = require('./routes/ukms');
const matchesRouter = require('./routes/matches');
const sessionsRouter = require('./routes/sessions');

const app = express();
const PORT = process.env.PORT || 5001;

// ─── Middleware ───────────────────────────────────────────────────────────────

// Allow all origins (suitable for development and cross-domain Vercel deployment)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse incoming JSON request bodies
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'UKMSync API is running', version: '1.0.0' });
});

// UKM routes  →  GET /api/ukms, GET /api/ukms/:id
app.use('/api/ukms', ukmsRouter);

// Match routes →  GET /api/matches, POST /api/matches
app.use('/api/matches', matchesRouter);

// Session routes → GET /api/sessions, GET /api/sessions/:id, POST /api/sessions
app.use('/api/sessions', sessionsRouter);

// ─── 404 Handler ─────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

// ─── Global Error Handler ────────────────────────────────────────────────────

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// ─── Export & Start Server ───────────────────────────────────────────────────

// Export app for Vercel Serverless Functions
module.exports = app;

// Listen locally if not running as a Vercel Serverless Function
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 UKMSync API is running on http://localhost:${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/`);
    console.log(`   UKMs:         http://localhost:${PORT}/api/ukms`);
    console.log(`   Matches:      http://localhost:${PORT}/api/matches`);
    console.log(`   Sessions:     http://localhost:${PORT}/api/sessions`);
  });
}
