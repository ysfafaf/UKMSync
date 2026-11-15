# UKMSync — Aplikasi Manajemen UKM & Papan Skor Multi-Sport

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06B6D4?logo=tailwindcss&logoColor=white)

---

## 📖 Deskripsi

**UKMSync** adalah Progressive Web App (PWA) yang dirancang untuk memudahkan manajemen Unit Kegiatan Mahasiswa (UKM) di lingkungan kampus Teknik Komputer Universitas Diponegoro. Aplikasi ini menyediakan fitur pencatatan dan pengelolaan UKM, serta papan skor digital untuk berbagai cabang olahraga seperti Badminton, Basket, Voli, dan Futsal.

Dengan UKMSync, mahasiswa dapat dengan mudah menemukan informasi UKM yang ingin diikuti, serta menyaksikan hasil pertandingan secara real-time melalui antarmuka yang modern dan responsif. Aplikasi ini dapat diinstal di perangkat mobile maupun desktop sebagai aplikasi web progresif.

---

## ✨ Fitur Utama

| Halaman | Deskripsi |
|---|---|
| 🏠 **Home** | Halaman utama dengan ringkasan UKM dan pertandingan terbaru |
| 🏅 **Daftar UKM** | Menjelajahi semua UKM dengan filter berdasarkan kategori |
| 📋 **Detail UKM** | Informasi lengkap UKM: jadwal, lokasi, dan deskripsi kegiatan |
| 🏆 **Scoreboard** | Papan skor multi-sport (Badminton, Basket, Voli, Futsal) |
| ➕ **Tambah Pertandingan** | Form untuk mencatat pertandingan dan skor baru |

### Fitur PWA
- ✅ Dapat diinstal di perangkat mobile & desktop
- ✅ Service Worker untuk caching offline
- ✅ Manifest dengan ikon aplikasi
- ✅ Responsive & mobile-first design

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend** | React 18, Vite, React Router DOM v6 |
| **Styling** | Tailwind CSS v3 |
| **PWA** | vite-plugin-pwa, Workbox |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (Neon Serverless) |
| **ORM/Driver** | `pg` (node-postgres) |
| **Deployment FE** | Vercel |
| **Deployment BE** | Railway / Render |

---

## 📁 Struktur Proyek

```
TA Prak PPB/
├── README.md
├── .gitignore
│
├── backend/
│   ├── package.json
│   ├── .env.example
│   ├── server.js          # Entry point Express app
│   ├── db.js              # PostgreSQL connection pool
│   ├── seed.js            # Inisialisasi tabel & data contoh (UKM, Match, Sesi)
│   ├── vercel.json        # Konfigurasi deployment Vercel
│   └── routes/
│       ├── ukms.js        # GET /api/ukms, GET /api/ukms/:id
│       ├── matches.js     # GET /api/matches, POST /api/matches
│       └── sessions.js    # GET /api/sessions, GET /api/sessions/:id, POST /api/sessions
│
└── frontend/
    ├── package.json
    ├── .env.example
    ├── index.html         # HTML entry point Vite
    ├── vercel.json        # Konfigurasi SPA routing Vercel
    ├── vite.config.js     # Konfigurasi Vite + PWA plugin
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── public/
    │   └── icons/
    │       ├── icon.svg
    │       ├── icon-192.png
    │       └── icon-512.png
    └── src/
        ├── main.jsx       # Root React entry
        ├── App.jsx        # Router & layout
        ├── config/
        │   └── api.js     # API base URL config
        ├── hooks/
        │   └── useApi.js  # Custom hook API fetch
        ├── components/
        │   ├── BottomNav.jsx
        │   ├── LoadingSpinner.jsx
        │   ├── MatchHistoryItem.jsx
        │   ├── MatchDetailModal.jsx
        │   ├── SessionHistoryCard.jsx
        │   ├── SessionDetailModal.jsx
        │   ├── SportBadge.jsx
        │   └── UkmCard.jsx
        └── pages/
            ├── HomePage.jsx
            ├── UkmDetailPage.jsx
            ├── MatchMakingPage.jsx
            ├── ScoreboardPage.jsx
            ├── HistoryPage.jsx
            └── ProfilePage.jsx
```

---

## 🚀 Instalasi & Penggunaan

### Prasyarat
- Node.js v18+ dan npm
- Akun [Neon](https://neon.tech) (PostgreSQL serverless gratis) atau PostgreSQL lokal

### 1. Clone Repository

```bash
git clone https://github.com/username/ukmsync.git
cd ukmsync
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Salin file environment
cp .env.example .env

# Edit .env — isi DATABASE_URL dengan connection string PostgreSQL/Neon Anda
# Contoh: DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require

# Inisialisasi tabel & seed data contoh
npm run seed

# Jalankan server backend (port 5000)
npm start
```

Backend akan berjalan di `http://localhost:5000`.

### 3. Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Salin file environment
cp .env.example .env

# Edit .env — pastikan VITE_API_URL mengarah ke backend Anda
# Contoh: VITE_API_URL=http://localhost:5000

# Jalankan development server (port 5173)
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`.

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Deskripsi | Contoh |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db?sslmode=require` |
| `PORT` | Port server backend | `5001` |

### Frontend (`frontend/.env`)

| Variable | Deskripsi | Contoh |
|---|---|---|
| `VITE_API_URL` | Base URL API backend | `http://localhost:5001` |

---

## 🌐 API Endpoints

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/` | Health check API |
| `GET` | `/api/ukms` | Ambil semua daftar UKM |
| `GET` | `/api/ukms/:id` | Ambil detail satu UKM spesifik |
| `GET` | `/api/matches` | Ambil riwayat pertandingan reguler (multi-sport) |
| `POST` | `/api/matches` | Simpan pertandingan baru dari Scoreboard |
| `GET` | `/api/sessions` | Ambil seluruh daftar sesi Match Making Badminton |
| `GET` | `/api/sessions/:id` | Ambil detail sesi beserta seluruh pertandingan di dalamnya |
| `POST` | `/api/sessions` | Simpan sesi Match Making Badminton beserta rekam jejak pertandingan |

---

## ☁️ Deployment

### Frontend → Vercel

1. Push repository ke GitHub
2. Buka [vercel.com](https://vercel.com) → Import project
3. Set **Root Directory** ke `frontend`
4. Tambahkan environment variable: `VITE_API_URL=<URL backend Anda>`
5. Deploy!

File `frontend/vercel.json` sudah dikonfigurasi untuk SPA routing otomatis.

### Backend → Railway / Render

**Railway:**
1. Buka [railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Set **Root Directory** ke `backend`
3. Tambahkan environment variable `DATABASE_URL` dan `PORT`
4. Railway akan otomatis mendeteksi Node.js dan menjalankan `npm start`

**Render:**
1. Buka [render.com](https://render.com) → New Web Service
2. Hubungkan repo GitHub, set root ke `backend`
3. Build Command: `npm install`, Start Command: `npm start`
4. Tambahkan environment variables

---

## 👨‍💻 Developer

| Info | Detail |
|---|---|
| **Mata Kuliah** | Tugas Akhir Praktikum Pemrograman Perangkat Bergerak (PPB) |
| **Program Studi** | Teknik Komputer |
| **Universitas** | Universitas Diponegoro (Undip) |

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademis Tugas Akhir Praktikum PPB — Teknik Komputer Universitas Diponegoro.
