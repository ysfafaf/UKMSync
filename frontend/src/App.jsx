// App.jsx - Setup router utama dan struktur halaman
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Import komponen navigasi
import BottomNav from './components/BottomNav.jsx';

// Import semua halaman
import HomePage from './pages/HomePage.jsx';
import UkmDetailPage from './pages/UkmDetailPage.jsx';
import MatchMakingPage from './pages/MatchMakingPage.jsx';
import ScoreboardPage from './pages/ScoreboardPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

// Komponen wrapper untuk menyembunyikan BottomNav di halaman tertentu
function AppLayout() {
  const location = useLocation();

  // Halaman yang tidak menampilkan BottomNav
  const hideNavPages = ['/ukm/'];
  const shouldHideNav = hideNavPages.some((page) =>
    location.pathname.startsWith(page)
  );

  return (
    <div className="min-h-screen bg-[#f2f8fc]">
      {/* Navigasi bawah/samping */}
      {!shouldHideNav && <BottomNav />}

      {/* Konten utama dengan padding untuk bottom nav di mobile */}
      <main
        className={`${
          !shouldHideNav
            ? 'pb-20 md:pb-0 md:pl-64'  // Padding untuk nav
            : ''                          // Tidak ada padding untuk halaman detail
        }`}
      >
        <Routes>
          {/* Halaman utama */}
          <Route path="/" element={<HomePage />} />
          {/* Halaman detail UKM */}
          <Route path="/ukm/:id" element={<UkmDetailPage />} />
          {/* Halaman match making */}
          <Route path="/matchmaking" element={<MatchMakingPage />} />
          {/* Halaman scoreboard */}
          <Route path="/scoreboard" element={<ScoreboardPage />} />
          {/* Halaman riwayat pertandingan */}
          <Route path="/history" element={<HistoryPage />} />
          {/* Halaman profil/tentang */}
          <Route path="/profile" element={<ProfilePage />} />
          {/* Fallback 404 */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-[70vh] gap-3 text-center px-4">
                <span className="text-4xl font-mono font-black text-slate-400">404</span>
                <h1 className="text-2xl font-bold font-sketch text-[#233148]">Halaman Tidak Ditemukan</h1>
                <p className="text-slate-600 text-xs font-medium">Halaman yang Anda tuju tidak tersedia atau telah dipindahkan.</p>
                <a href="/" className="btn-primary mt-2">Kembali ke Beranda</a>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
