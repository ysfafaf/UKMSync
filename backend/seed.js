// seed.js - Initialize database tables and insert sample data
// Run with: npm run seed
require('dotenv').config();

const pool = require('./db');

// ─── DDL: Create Tables ───────────────────────────────────────────────────────

const CREATE_UKMS_TABLE = `
CREATE TABLE IF NOT EXISTS ukms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  schedule VARCHAR(150) NOT NULL,
  location VARCHAR(100) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const CREATE_MATCHES_TABLE = `
CREATE TABLE IF NOT EXISTS matches (
  id SERIAL PRIMARY KEY,
  sport_type VARCHAR(50) NOT NULL,
  team_a_name VARCHAR(150) NOT NULL,
  team_b_name VARCHAR(150) NOT NULL,
  score_a INT DEFAULT 0,
  score_b INT DEFAULT 0,
  match_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const CREATE_SESSIONS_TABLE = `
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  sport_type VARCHAR(50) NOT NULL DEFAULT 'Badminton',
  session_name VARCHAR(150) NOT NULL DEFAULT 'Sesi Mabar Badminton',
  game_format VARCHAR(50) NOT NULL DEFAULT 'Double',
  court_count INT NOT NULL DEFAULT 1,
  total_players INT NOT NULL DEFAULT 0,
  players JSONB NOT NULL DEFAULT '[]'::jsonb,
  duration_seconds INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const CREATE_SESSION_MATCHES_TABLE = `
CREATE TABLE IF NOT EXISTS session_matches (
  id SERIAL PRIMARY KEY,
  session_id INT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  match_number INT NOT NULL,
  court_number INT NOT NULL,
  team_a_name VARCHAR(150) NOT NULL,
  team_b_name VARCHAR(150) NOT NULL,
  score_a INT NOT NULL DEFAULT 0,
  score_b INT NOT NULL DEFAULT 0,
  status VARCHAR(50) NOT NULL DEFAULT 'finished',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

// ─── Sample UKM Data ─────────────────────────────────────────────────────────

const SAMPLE_UKMS = [
  {
    name: 'Badminton',
    category: 'Olahraga',
    description:
      'Unit kegiatan mahasiswa bulutangkis Teknik Komputer Undip. Wadah latihan rutin, pengembangan teknik servis, smash, footwork, serta persiapan turnamen antar jurusan dan fakultas.',
    schedule: 'Senin & Rabu 16:00 - 18:00 WIB',
    location: 'GOR Badminton Undip Tembalang',
    image_url: '/images/sample-ukm.jpg',
  },
  {
    name: 'Voli',
    category: 'Olahraga',
    description:
      'Komunitas olahraga bola voli mahasiswa Teknik Komputer Undip. Fokus pada pembinaan kekompakan tim, teknik passing, servis atas/bawah, block, dan smash untuk tim putra maupun putri.',
    schedule: 'Jumat 15:30 - 17:30 WIB',
    location: 'Lapangan Voli FT Undip',
    image_url: '/images/sample-ukm.jpg',
  },
  {
    name: 'Futsal',
    category: 'Olahraga',
    description:
      'Unit kegiatan futsal Teknik Komputer Undip. Terbuka untuk seluruh mahasiswa yang ingin mengasah kemampuan mengolah bola, kelincahan, taktik permainan, dan berlaga di liga teknik.',
    schedule: 'Sabtu 09:00 - 11:00 WIB',
    location: 'Lapangan Futsal Tembalang',
    image_url: '/images/sample-ukm.jpg',
  },
  {
    name: 'Basket',
    category: 'Olahraga',
    description:
      'Wadah pembinaan bakat olahraga bola basket Teknik Komputer. Rutin mengadakan latihan drill fundamental dribbling, shooting, defense, serta kompetisi 3x3 dan 5x5.',
    schedule: 'Selasa & Kamis 16:00 - 18:00 WIB',
    location: 'Lapangan Basket FT Undip',
    image_url: '/images/sample-ukm.jpg',
  },
  {
    name: 'Ruang Karya',
    category: 'Seni & Budaya',
    description:
      'Wadah eksplorasi seni rupa dan media visual kreatif mahasiswa Teknik Komputer, meliputi fotografi, tipografi, desain grafis, ilustrasi digital, lukisan, dan kurasi pameran visual.',
    schedule: 'Kamis 15:00 - 17:00 WIB',
    location: 'Ruang Multimedia & Studio FT',
    image_url: '/images/sample-ukm.jpg',
  },
  {
    name: 'Ruang Nada',
    category: 'Seni & Budaya',
    description:
      'Komunitas musik dan wadah penyaluran bakat olah instrumen (gitar, bass, drum, keyboard), vokal, dan band mahasiswa Teknik Komputer untuk sesi jamming rutin dan pertunjukan kampus.',
    schedule: 'Rabu 18:30 - 20:30 WIB',
    location: 'Studio Musik Gedung UKM Undip',
    image_url: '/images/sample-ukm.jpg',
  },
  {
    name: 'Esport',
    category: 'Hiburan',
    description:
      'Komunitas kompetitif e-sports Teknik Komputer Undip. Menampung dan melatih talenta gaming untuk game Mobile Legends, Tekken, PUBG Mobile, Valorant, hingga persiapan turnamen resmi.',
    schedule: 'Jumat 19:30 - 22:00 WIB',
    location: 'Online Discord & Lab Komputer',
    image_url: '/images/sample-ukm.jpg',
  },
  {
    name: 'Trojanholic',
    category: 'Komunitas',
    description:
      'Tim supporter kebanggaan Departemen Teknik Komputer Undip. Pengobar semangat, chant kebanggaan, dan koreografi solidaritas tribun dalam mengawal kontingen atlet di setiap laga.',
    schedule: 'Fleksibel (Mengikuti Jadwal Pertandingan)',
    location: 'Tribun & Arena Olahraga Undip',
    image_url: '/images/sample-ukm.jpg',
  },
];

// ─── Sample Match Data (Scoreboard Reguler) ───────────────────────────────────

const SAMPLE_MATCHES = [
  {
    sport_type: 'Badminton',
    team_a_name: 'Tim Badminton A - Teknik Komputer',
    team_b_name: 'Tim Badminton B - Teknik Sipil',
    score_a: 21,
    score_b: 15,
  },
  {
    sport_type: 'Futsal',
    team_a_name: 'Tim Futsal Teknik Komputer',
    team_b_name: 'Tim Futsal Teknik Elektro',
    score_a: 3,
    score_b: 2,
  },
  {
    sport_type: 'Voli',
    team_a_name: 'Tim Voli Putra Teknik Komputer',
    team_b_name: 'Tim Voli Putra Teknik Mesin',
    score_a: 3,
    score_b: 1,
  },
  {
    sport_type: 'Basket',
    team_a_name: 'Teknik Komputer Basketball',
    team_b_name: 'Teknik Arsitektur Basketball',
    score_a: 54,
    score_b: 48,
  },
];

// ─── Sample Session Data (Match Making Badminton) ────────────────────────────

const SAMPLE_SESSIONS = [
  {
    sport_type: 'Badminton',
    session_name: 'Mabar Badminton Teknik Komputer #1',
    game_format: 'Double',
    court_count: 2,
    total_players: 8,
    players: ['Fajar', 'Rian', 'Kevin', 'Marcus', 'Hendra', 'Ahsan', 'Ginting', 'Jojo'],
    duration_seconds: 3600,
    matches: [
      {
        match_number: 1,
        court_number: 1,
        team_a_name: 'Fajar & Rian',
        team_b_name: 'Kevin & Marcus',
        score_a: 21,
        score_b: 19,
        status: 'finished',
      },
      {
        match_number: 2,
        court_number: 2,
        team_a_name: 'Hendra & Ahsan',
        team_b_name: 'Ginting & Jojo',
        score_a: 21,
        score_b: 18,
        status: 'finished',
      },
      {
        match_number: 3,
        court_number: 1,
        team_a_name: 'Fajar & Hendra',
        team_b_name: 'Marcus & Jojo',
        score_a: 22,
        score_b: 20,
        status: 'finished',
      },
      {
        match_number: 4,
        court_number: 2,
        team_a_name: 'Rian & Ahsan',
        team_b_name: 'Kevin & Ginting',
        score_a: 19,
        score_b: 21,
        status: 'finished',
      },
    ],
  },
  {
    sport_type: 'Badminton',
    session_name: 'Sesi Latihan Rutin Mahasiswa Baru',
    game_format: 'Single',
    court_count: 1,
    total_players: 4,
    players: ['Budi Santoso', 'Dimas Arya', 'Rizky Pratama', 'Irfan Hakim'],
    duration_seconds: 2400,
    matches: [
      {
        match_number: 1,
        court_number: 1,
        team_a_name: 'Budi Santoso',
        team_b_name: 'Dimas Arya',
        score_a: 21,
        score_b: 15,
        status: 'finished',
      },
      {
        match_number: 2,
        court_number: 1,
        team_a_name: 'Rizky Pratama',
        team_b_name: 'Irfan Hakim',
        score_a: 18,
        score_b: 21,
        status: 'finished',
      },
    ],
  },
];

// ─── Seed Function ────────────────────────────────────────────────────────────

async function seed() {
  const client = await pool.connect();

  try {
    console.log('⏳ Starting database seed...\n');

    // 1. Create tables
    console.log('📐 Creating tables if they do not exist...');
    await client.query(CREATE_UKMS_TABLE);
    await client.query(CREATE_MATCHES_TABLE);
    await client.query(CREATE_SESSIONS_TABLE);
    await client.query(CREATE_SESSION_MATCHES_TABLE);
    console.log('   ✅ Tables ready\n');

    // 2. Clear existing seed data (clean slate)
    console.log('🗑️  Clearing existing data...');
    await client.query('DELETE FROM session_matches');
    await client.query('DELETE FROM sessions');
    await client.query('DELETE FROM matches');
    await client.query('DELETE FROM ukms');

    // Reset sequences
    await client.query('ALTER SEQUENCE ukms_id_seq RESTART WITH 1');
    await client.query('ALTER SEQUENCE matches_id_seq RESTART WITH 1');
    await client.query('ALTER SEQUENCE sessions_id_seq RESTART WITH 1');
    await client.query('ALTER SEQUENCE session_matches_id_seq RESTART WITH 1');
    console.log('   ✅ Existing data cleared and sequences reset\n');

    // 3. Insert UKMs
    console.log('🌱 Seeding UKMs...');
    for (const ukm of SAMPLE_UKMS) {
      await client.query(
        `INSERT INTO ukms (name, category, description, schedule, location, image_url)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [ukm.name, ukm.category, ukm.description, ukm.schedule, ukm.location, ukm.image_url]
      );
      console.log(`   ✅ Inserted: ${ukm.name}`);
    }

    // 4. Insert Matches
    console.log('\n🏆 Seeding regular matches...');
    for (const match of SAMPLE_MATCHES) {
      await client.query(
        `INSERT INTO matches (sport_type, team_a_name, team_b_name, score_a, score_b)
         VALUES ($1, $2, $3, $4, $5)`,
        [match.sport_type, match.team_a_name, match.team_b_name, match.score_a, match.score_b]
      );
      console.log(`   ✅ Inserted: ${match.sport_type} — ${match.team_a_name} vs ${match.team_b_name}`);
    }

    // 5. Insert Sessions & Session Matches
    console.log('\n🏸 Seeding Match Making sessions...');
    for (const session of SAMPLE_SESSIONS) {
      const res = await client.query(
        `INSERT INTO sessions (sport_type, session_name, game_format, court_count, total_players, players, duration_seconds)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id`,
        [
          session.sport_type,
          session.session_name,
          session.game_format,
          session.court_count,
          session.total_players,
          JSON.stringify(session.players),
          session.duration_seconds,
        ]
      );

      const sessionId = res.rows[0].id;
      for (const m of session.matches) {
        await client.query(
          `INSERT INTO session_matches (session_id, match_number, court_number, team_a_name, team_b_name, score_a, score_b, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [sessionId, m.match_number, m.court_number, m.team_a_name, m.team_b_name, m.score_a, m.score_b, m.status]
        );
      }
      console.log(`   ✅ Inserted session: ${session.session_name} (${session.matches.length} matches)`);
    }

    console.log('\n🎉 Database seeded successfully!');
  } catch (err) {
    console.error('\n❌ Seed failed:', err.message);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the seed
seed().catch(() => process.exit(1));
