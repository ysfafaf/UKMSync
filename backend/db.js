// db.js - PostgreSQL connection pool using Neon (pg-compatible)
require('dotenv').config();
const { Pool } = require('pg');

// Create a connection pool using the DATABASE_URL from environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Neon requires SSL; enforce it via the connection string (?sslmode=require)
  // but we also set ssl here as a fallback for local pg connections
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('neon.tech')
    ? { rejectUnauthorized: false }
    : false,
});

// Log successful connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

// Log pool errors
pool.on('error', (err) => {
  console.error('❌ Unexpected database pool error:', err.message);
});

module.exports = pool;
