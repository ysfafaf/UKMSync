// Halaman Detail UKM - Sketch Design System (Forest Green Edition)
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import {
  ArrowLeftIcon,
  CalendarIcon,
  MapPinIcon,
  BookOpenIcon,
  CategorySportIcon,
  CategoryTechIcon,
  CategoryArtIcon,
  CategoryGameIcon,
  UsersIcon,
  WhatsAppIcon,
  ExternalLinkIcon,
} from '../components/Icons.jsx';

const CATEGORY_ICONS = {
  Olahraga: CategorySportIcon,
  Teknologi: CategoryTechIcon,
  'Seni & Budaya': CategoryArtIcon,
  Hiburan: CategoryGameIcon,
  Komunitas: UsersIcon,
};

const CATEGORY_COLORS = {
  Olahraga: {
    bg: 'bg-[#e6f4e4] text-[#254423]',
    badge: 'bg-[#e6f4e4] text-[#254423] border-[#10240f]',
  },
  Teknologi: {
    bg: 'bg-[#ECFEFF] text-[#0E7490]',
    badge: 'bg-[#ECFEFF] text-[#0E7490] border-[#10240f]',
  },
  'Seni & Budaya': {
    bg: 'bg-[#FFF1F2] text-[#BE123C]',
    badge: 'bg-[#FFF1F2] text-[#BE123C] border-[#10240f]',
  },
  Hiburan: {
    bg: 'bg-[#FEF3C7] text-[#92400E]',
    badge: 'bg-[#FEF3C7] text-[#92400E] border-[#10240f]',
  },
  Komunitas: {
    bg: 'bg-[#FFEDD5] text-[#C2410C]',
    badge: 'bg-[#FFEDD5] text-[#C2410C] border-[#10240f]',
  },
};

function UkmDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: ukm, loading, error } = useApi(`/api/ukms/${id}`);

  const Icon = ukm ? (CATEGORY_ICONS[ukm.category] || CategorySportIcon) : CategorySportIcon;
  const colorTheme = ukm ? (CATEGORY_COLORS[ukm.category] || CATEGORY_COLORS.Olahraga) : CATEGORY_COLORS.Olahraga;

  return (
    <div className="min-h-screen pb-16">
      {/* State: Loading */}
      {loading && (
        <div className="pt-20">
          <LoadingSpinner message="Memuat detail UKM..." />
        </div>
      )}

      {/* State: Error */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 px-4 text-center">
          <h2 className="text-xl font-bold font-sketch text-[#10240f]">Data UKM Tidak Ditemukan</h2>
          <p className="text-slate-500 text-xs">{error}</p>
          <button onClick={() => navigate('/')} className="btn-primary mt-2">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      )}

      {/* State: Data tersedia */}
      {!loading && !error && ukm && (
        <div className="max-w-2xl mx-auto px-4 pt-6">
          {/* Tombol Navigasi Kembali */}
          <button
            onClick={() => navigate('/')}
            className="mb-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-[#10240f] border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f] rounded-full text-xs font-bold hover:translate-x-0.5 transition-all"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>

          {/* Hero Banner Foto UKM dengan Frame Sketch */}
          <div className="w-full h-52 sm:h-64 rounded-2xl border-2 border-[#10240f] shadow-[3px_3px_0px_#10240f] overflow-hidden mb-4 bg-[#f4faf3] relative">
            <img
              src={ukm.image_url || '/images/sample-ukm.jpg'}
              alt={ukm.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/sample-ukm.jpg';
              }}
            />
            {/* Lencana Kategori Overlay */}
            <div className="absolute top-3 left-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border-1.5 shadow-[1.5px_1.5px_0px_#10240f] backdrop-blur-xs ${colorTheme.badge}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{ukm.category}</span>
              </span>
            </div>
          </div>

          {/* Banner Hero Identitas UKM */}
          <div className="card p-4 sm:p-5 mb-4 bg-white">
            <h1 className="text-2xl sm:text-3xl font-bold font-sketch text-[#10240f] tracking-wide break-words">
              {ukm.name}
            </h1>
            <p className="text-xs font-mono text-slate-500 font-semibold mt-1">
              Unit Kegiatan Mahasiswa &bull; Teknik Komputer Undip
            </p>
          </div>

          {/* Rincian Informasi */}
          <div className="space-y-3.5">
            {/* Jadwal Latihan */}
            <div className="card flex items-start gap-3 bg-white">
              <div className="w-10 h-10 bg-[#e6f4e4] border-2 border-[#10240f] shadow-[1.5px_1.5px_0px_#10240f] rounded-xl flex items-center justify-center shrink-0 text-slate-800">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">Jadwal Rutin</p>
                <p className="text-sm font-bold text-[#10240f] mt-0.5 break-words">{ukm.schedule}</p>
              </div>
            </div>

            {/* Lokasi */}
            <div className="card flex items-start gap-3 bg-white">
              <div className="w-10 h-10 bg-[#e6f4e4] border-2 border-[#10240f] shadow-[1.5px_1.5px_0px_#10240f] rounded-xl flex items-center justify-center shrink-0 text-slate-800">
                <MapPinIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">Lokasi Kegiatan</p>
                <p className="text-sm font-bold text-[#10240f] mt-0.5 break-words">{ukm.location}</p>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="card bg-white">
              <div className="flex items-center gap-2 mb-2 text-slate-700">
                <BookOpenIcon className="w-4 h-4 text-[#418a3b]" />
                <p className="text-[11px] font-mono font-bold uppercase tracking-wider">Deskripsi Kegiatan</p>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal break-words">
                {ukm.description}
              </p>
            </div>

            {/* CTA Komunitas WhatsApp */}
            <div className="card p-4 sm:p-5 bg-[#e6f4e4] border-2 border-[#10240f] shadow-[3px_3px_0px_#10240f] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-[#16A34A] text-white flex items-center justify-center shrink-0 border border-[#10240f] shadow-[1px_1px_0px_#10240f]">
                    <WhatsAppIcon className="w-4 h-4" />
                  </div>
                  <h3 className="font-sketch text-lg sm:text-xl font-bold text-[#10240f]">
                    Tertarik Bergabung dengan {ukm.name}?
                  </h3>
                </div>
                <p className="text-xs text-slate-700 font-medium">
                  Hubungi pengurus dan bergabunglah ke grup komunitas resmi WhatsApp UKM Teknik Komputer Undip.
                </p>
              </div>

              <a
                href="https://chat.whatsapp.com/IQytd9YroCH4g463f2hLoH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs py-2.5 px-4 rounded-full border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] transition-all shrink-0 self-start sm:self-auto"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Daftar via Komunitas WhatsApp</span>
                <ExternalLinkIcon className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UkmDetailPage;
