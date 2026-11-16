// Halaman Utama - Sketch Design System (Matcha Olive Edition)
import React from 'react';
import useApi from '../hooks/useApi.js';
import UkmCard from '../components/UkmCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { RefreshIcon, ShuttlecockIcon, WhatsAppIcon, ExternalLinkIcon } from '../components/Icons.jsx';

function HomePage() {
  const { data: ukms, loading, error, refetch } = useApi('/api/ukms');

  return (
    <div className="min-h-screen pb-16">
      {/* Header Sketch Matcha Olive */}
      <div className="bg-[#F7F8F5] border-b-2 border-[#192118] shadow-[0_2px_0px_rgba(25,33,24,0.05)] px-4 pt-10 pb-6 md:pt-8">
        <div className="max-w-4xl mx-auto">
          {/* Logo dan Judul */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 bg-white border-2 border-[#192118] shadow-[3px_3px_0px_#192118] rounded-xl overflow-hidden flex items-center justify-center shrink-0">
              <img src="/icons/iconapp.jpg" alt="UKMSync Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-sketch text-[#192118] tracking-wide">
                UKM Teknik Komputer
              </h1>
              <p className="text-xs font-mono font-semibold text-slate-600">
                Universitas Diponegoro • Sketch Sports Hub
              </p>
            </div>
          </div>

          {/* Banner Informasi Cepat & Komunitas WhatsApp */}
          <div className="mt-4 bg-[#E9EEE4] rounded-2xl p-4 border-2 border-dashed border-[#192118] shadow-[3px_3px_0px_#192118] flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#192118] flex items-center gap-1.5">
                <ShuttlecockIcon className="w-4 h-4 text-[#527D48]" />
                <span>Pusat Aktivitas UKM & Papan Skor Digital</span>
              </p>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">
                Pantau jadwal latihan, buat sesi rotasi lapangan badminton, dan catat skor pertandingan.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href="https://chat.whatsapp.com/IQytd9YroCH4g463f2hLoH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs py-2 px-3.5 rounded-full border-2 border-[#192118] shadow-[2px_2px_0px_#192118] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>Komunitas WhatsApp</span>
                <ExternalLinkIcon className="w-3 h-3 opacity-80" />
              </a>
              <a
                href="/matchmaking"
                className="btn-primary text-xs py-2 px-3.5 whitespace-nowrap hidden sm:inline-flex"
              >
                <ShuttlecockIcon className="w-3.5 h-3.5" />
                <span>Sesi Match Making</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Label Seksi */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-sketch text-[#192118]">
              Daftar UKM
            </h2>
            {ukms && (
              <span className="font-mono text-xs font-bold bg-[#E9EEE4] text-[#274221] border border-[#192118] px-2 py-0.2 rounded-full shadow-[1px_1px_0px_#192118]">
                {ukms.length} UKM
              </span>
            )}
          </div>

          {!loading && (
            <button
              onClick={refetch}
              className="text-xs font-bold text-[#527D48] hover:text-[#3D6135] flex items-center gap-1.5 transition-colors"
            >
              <RefreshIcon className="w-3.5 h-3.5" />
              <span>Perbarui Data</span>
            </button>
          )}
        </div>

        {/* State: Loading */}
        {loading && <LoadingSpinner message="Memuat daftar UKM..." />}

        {/* State: Error */}
        {error && !loading && (
          <div className="card text-center py-12">
            <p className="text-slate-900 font-bold mb-1">Gagal memuat data UKM</p>
            <p className="text-slate-500 text-xs mb-4">{error}</p>
            <button onClick={refetch} className="btn-primary text-xs">
              <RefreshIcon className="w-3.5 h-3.5" />
              <span>Coba Lagi</span>
            </button>
          </div>
        )}

        {/* State: Data Kosong */}
        {!loading && !error && ukms && ukms.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-slate-900 font-bold">Belum ada data UKM terdaftar</p>
          </div>
        )}

        {/* Grid Kartu UKM: 2 kolom di mobile, 3 kolom di desktop */}
        {!loading && !error && ukms && ukms.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
            {ukms.map((ukm) => (
              <UkmCard key={ukm.id} ukm={ukm} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
