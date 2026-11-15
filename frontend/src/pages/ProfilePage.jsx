// Halaman Profil & Informasi Aplikasi - Sketch Design System
import React, { useState } from 'react';
import {
  ProfileIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  TrophyIcon,
  BookOpenIcon,
  CalendarIcon,
  CourtIcon,
  ScoreboardIcon,
  HistoryIcon,
  ShuttlecockIcon,
  GithubIcon,
  WhatsAppIcon,
  HelpCircleIcon,
  ExternalLinkIcon,
  CloseIcon,
  CheckIcon,
} from '../components/Icons.jsx';

const CORE_FEATURES = [
  {
    title: 'Direktori & Jadwal UKM Jurusan',
    desc: 'Informasi lengkap jadwal latihan, lokasi, dan deskripsi seluruh UKM Teknik Komputer.',
    icon: CalendarIcon,
  },
  {
    title: 'Rotasi Lapangan Badminton Berbasis Sesi & Durasi',
    desc: 'Algoritma matchmaking adil (fair rotation) berdasarkan jumlah main, format game, dan jumlah lapangan.',
    icon: CourtIcon,
  },
  {
    title: 'Papan Skor Digital Multi-Sport (4 Cabang Olahraga)',
    desc: 'Papan skor digital langsung mandiri untuk Badminton, Basket, Voli, dan Futsal dengan tombol ergonomis.',
    icon: ScoreboardIcon,
  },
  {
    title: 'Arsip Riwayat Sesi & Pertandingan Terstruktur',
    desc: 'Pemisahan riwayat ganda antara sesi mabar kolektif dan skor pertandingan reguler dengan detail lengkap.',
    icon: HistoryIcon,
  },
];

const DEVELOPER_INFO = [
  { label: 'Nama Pengembang', value: 'Yusuf Afaf Nur Abdillah' },
  { label: 'NIM', value: '21120124130100', mono: true },
  { label: 'Program Studi', value: 'S1 Teknik Komputer' },
  { label: 'Fakultas / Institusi', value: 'Fakultas Teknik, Universitas Diponegoro' },
  { label: 'Mata Kuliah', value: 'Praktikum Pemrograman Perangkat Bergerak (PPB) 2026' },
  { label: 'Kategori', value: 'Tugas Akhir' },
];

function ProfilePage() {
  const [showGuideModal, setShowGuideModal] = useState(false);

  return (
    <div className="min-h-screen pb-16">
      {/* ─── HEADER HALAMAN SKETCH ─── */}
      <div className="bg-[#f4faf3] border-b-2 border-[#10240f] shadow-[0_2px_0px_rgba(17,24,39,0.05)] px-4 pt-10 pb-5 md:pt-6">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-[#418a3b] text-white border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f] rounded-xl flex items-center justify-center shrink-0">
            <ProfileIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-sketch text-[#10240f] tracking-wide">
              Informasi Aplikasi
            </h1>
            <p className="text-xs font-mono font-semibold text-slate-600">
              Dokumentasi sistem, pengembang & panduan penggunaan
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* ─── BAGIAN HEADER APLIKASI (TOP SECTION) ─── */}
        <div className="card text-center py-7 bg-white">
          {/* Ikon / Logo Minimalis Bertema Olahraga & Manajemen */}
          <div className="w-16 h-16 bg-[#418a3b] text-white rounded-2xl border-2 border-[#10240f] shadow-[3px_3px_0px_#10240f] flex items-center justify-center mx-auto mb-3">
            <ShuttlecockIcon className="w-8 h-8 text-white stroke-[2]" />
          </div>

          <h2 className="text-3xl font-bold font-sketch text-[#10240f] tracking-wide">
            UKMSync
          </h2>

          <p className="text-xs font-medium text-slate-600 mt-0.5">
            Sistem Manajemen UKM &amp; Papan Skor Multi-Sport Terpadu
          </p>

          <div className="mt-2.5">
            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-[#e6f4e4] text-[#10240f] border-2 border-[#10240f] shadow-[1.5px_1.5px_0px_#10240f]">
              v1.0.0
            </span>
          </div>
        </div>

        {/* ─── TENTANG APLIKASI (ABOUT THE APP) ─── */}
        <div className="card bg-white">
          <div className="flex items-center gap-2 mb-2.5 text-[#10240f]">
            <BookOpenIcon className="w-4 h-4 text-[#418a3b]" />
            <h2 className="text-sm font-bold font-mono tracking-tight uppercase">
              Tentang Aplikasi
            </h2>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-normal bg-[#f4faf3] p-3.5 rounded-xl border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f]">
            Aplikasi berbasis Progressive Web App (PWA) yang dirancang untuk membantu mahasiswa dan pengurus Unit Kegiatan Mahasiswa (UKM) di lingkungan Departemen Teknik Komputer Universitas Diponegoro. Berfungsi sebagai pusat informasi UKM, pengatur rotasi lapangan badminton berbasis sesi (<em>Match Making</em>), serta papan skor digital multi-sport (Badminton, Basket, Voli, Futsal).
          </p>

          {/* List Fitur Utama */}
          <div className="mt-4">
            <h3 className="text-xs font-bold font-mono text-[#10240f] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <TrophyIcon className="w-3.5 h-3.5 text-[#418a3b]" />
              <span>Fitur Utama</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CORE_FEATURES.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 bg-[#f4faf3] border-2 border-[#10240f] rounded-xl shadow-[2px_2px_0px_#10240f] flex items-start gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white border border-[#10240f] shadow-[1px_1px_0px_#10240f] flex items-center justify-center shrink-0 mt-0.5 text-[#418a3b]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#10240f] leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-1 leading-normal font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── INFORMASI PENGEMBANG & AKADEMIK (KEY-VALUE) ─── */}
        <div className="card bg-white">
          <div className="flex items-center gap-2 mb-3 text-[#10240f]">
            <AcademicCapIcon className="w-4 h-4 text-[#418a3b]" />
            <h2 className="text-sm font-bold font-mono tracking-tight uppercase">
              Informasi Pengembang &amp; Akademik
            </h2>
          </div>

          <div className="divide-y-2 divide-dashed divide-[#e6f4e4] border-2 border-[#10240f] rounded-xl overflow-hidden shadow-[2px_2px_0px_#10240f] bg-[#f4faf3]">
            {DEVELOPER_INFO.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 gap-1 sm:gap-4 hover:bg-white/60 transition-colors"
              >
                <span className="text-[11px] font-mono font-bold text-slate-500 uppercase shrink-0">
                  {item.label}
                </span>
                <span
                  className={`text-xs font-bold text-[#10240f] sm:text-right ${
                    item.mono ? 'font-mono' : ''
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── BAGIAN AKSI / TAUTAN PENDUKUNG (FOOTER UTILITIES) ─── */}
        <div className="card bg-white space-y-3">
          <div className="flex items-center gap-2 text-[#10240f]">
            <CodeBracketIcon className="w-4 h-4 text-[#418a3b]" />
            <h2 className="text-sm font-bold font-mono tracking-tight uppercase">
              Tautan &amp; Bantuan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Tombol Gabung Komunitas WhatsApp UKM */}
            <a
              href="https://chat.whatsapp.com/IQytd9YroCH4g463f2hLoH"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs py-2.5 px-4 rounded-full border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] transition-all sm:col-span-2 text-center"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Daftar / Gabung Komunitas WhatsApp UKM Teknik Komputer</span>
              <ExternalLinkIcon className="w-3.5 h-3.5 opacity-80 ml-auto sm:ml-0" />
            </a>

            {/* Tombol Lihat Source Code (GitHub) */}
            <a
              href="https://github.com/yusufafaf/ukmsync"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 text-center"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Lihat Source Code (GitHub)</span>
              <ExternalLinkIcon className="w-3.5 h-3.5 text-slate-400 ml-auto sm:ml-0" />
            </a>

            {/* Tombol Panduan Singkat Penggunaan */}
            <button
              type="button"
              onClick={() => setShowGuideModal(true)}
              className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 text-center"
            >
              <HelpCircleIcon className="w-4 h-4" />
              <span>Panduan Singkat Penggunaan</span>
            </button>
          </div>
        </div>

        {/* ─── FOOTER COPYRIGHT TEXT ─── */}
        <div className="pt-3 pb-2 text-center">
          <p className="text-[11px] font-mono text-slate-500 font-medium">
            &copy; 2026 Teknik Komputer Undip &bull; Dibuat untuk Tugas Akhir Praktikum PPB
          </p>
        </div>
      </div>

      {/* ─── MODAL PANDUAN PENGGUNAAN SKETCH ─── */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border-3 border-[#10240f] shadow-[6px_6px_0px_#10240f] w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden animate-scale-up">
            {/* Header Modal */}
            <div className="bg-[#418a3b] text-white px-5 py-4 flex items-center justify-between border-b-2 border-[#10240f]">
              <div className="flex items-center gap-2">
                <HelpCircleIcon className="w-5 h-5 text-white" />
                <h3 className="text-lg font-bold font-sketch tracking-wide">
                  Panduan Singkat Penggunaan
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="w-7 h-7 rounded-lg bg-white hover:bg-[#e6f4e4] text-[#10240f] border border-[#10240f] shadow-[1px_1px_0px_#10240f] flex items-center justify-center transition-all"
                aria-label="Tutup"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Konten Modal */}
            <div className="p-5 overflow-y-auto space-y-4 bg-[#f4faf3] text-xs">
              {/* Panduan 1: Match Making Badminton */}
              <div className="bg-white border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2 font-bold text-[#418a3b]">
                  <ShuttlecockIcon className="w-4 h-4" />
                  <h4 className="text-sm font-bold text-[#10240f]">
                    1. Mengatur Sesi Match Making Badminton
                  </h4>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-700 font-medium leading-relaxed">
                  <li>Buka menu <strong>Match Making</strong> melalui navigasi bawah/samping.</li>
                  <li>Masukkan daftar nama pemain (satu nama per baris) atau gunakan tombol sampel cepat.</li>
                  <li>Tentukan format pertandingan (<em>Tunggal 1v1</em> atau <em>Ganda 2v2</em>) serta jumlah lapangan yang tersedia.</li>
                  <li>Klik <strong>Mulai Sesi Mabar</strong>. Sistem akan mengacak dan mengatur antrean rotasi bermain secara adil.</li>
                  <li>Catat skor pada papan skor inline atau gunakan <strong>Papan Skor Penuh</strong> untuk tampilan besar.</li>
                  <li>Ketika bermain selesai, klik tombol <strong>Akhiri Sesi</strong> untuk menyimpan seluruh riwayat match ke database secara permanen.</li>
                </ol>
              </div>

              {/* Panduan 2: Scoreboard Multi-Sport */}
              <div className="bg-white border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2 font-bold text-[#418a3b]">
                  <ScoreboardIcon className="w-4 h-4" />
                  <h4 className="text-sm font-bold text-[#10240f]">
                    2. Papan Skor Digital Multi-Sport (Mandiri)
                  </h4>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-700 font-medium leading-relaxed">
                  <li>Buka menu <strong>Scoreboard</strong>.</li>
                  <li>Pilih salah satu dari 4 cabang olahraga (<em>Badminton, Basket, Voli, Futsal</em>).</li>
                  <li>Ketik nama kedua tim yang bertanding lalu tekan <strong>Mulai Pertandingan</strong>.</li>
                  <li>Gunakan tombol <strong>+1</strong> atau <strong>-1</strong> untuk mengubah skor secara langsung.</li>
                  <li>Timer pertandingan dapat dihentikan sementara (<em>Pause</em>) atau dilanjutkan (<em>Play</em>).</li>
                  <li>Klik <strong>Simpan Pertandingan</strong> untuk memasukkan hasil skor ke tab Match Reguler di halaman Riwayat.</li>
                </ol>
              </div>

              {/* Panduan 3: Membaca Riwayat */}
              <div className="bg-white border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2 font-bold text-[#418a3b]">
                  <HistoryIcon className="w-4 h-4" />
                  <h4 className="text-sm font-bold text-[#10240f]">
                    3. Membuka Riwayat Pertandingan
                  </h4>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                  Halaman <strong>Riwayat</strong> memiliki dua tab terpisah:
                  <br />
                  &bull; <strong>Sesi Match Making:</strong> Berisi kartu ringkasan sesi mabar badminton. Klik kartu untuk melihat durasi, daftar lengkap pemain, dan skor setiap match.
                  <br />
                  &bull; <strong>Match Reguler:</strong> Berisi seluruh skor pertandingan tunggal dari Scoreboard mandiri dengan filter cabang olahraga.
                </p>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="border-t-2 border-[#10240f] px-5 py-3 bg-white flex justify-end">
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="btn-secondary py-1.5 px-5 text-xs font-bold"
              >
                Tutup Panduan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
