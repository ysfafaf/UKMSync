// Halaman Riwayat Pertandingan (Dual-Type History) - Sketch Design System (Forest Green Edition)
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useApi from '../hooks/useApi.js';
import MatchHistoryItem from '../components/MatchHistoryItem.jsx';
import SessionHistoryCard from '../components/SessionHistoryCard.jsx';
import SessionDetailModal from '../components/SessionDetailModal.jsx';
import MatchDetailModal from '../components/MatchDetailModal.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import {
  HistoryIcon,
  ShuttlecockIcon,
  ScoreboardIcon,
  RefreshIcon,
} from '../components/Icons.jsx';

const SPORT_FILTER_OPTIONS = ['Semua', 'Badminton', 'Basket', 'Voli', 'Futsal'];

function HistoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTab = searchParams.get('tab') === 'regular' ? 'regular' : 'sessions';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeSportFilter, setActiveSportFilter] = useState('Semua');

  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const {
    data: sessions,
    loading: loadingSessions,
    error: errorSessions,
    refetch: refetchSessions,
  } = useApi('/api/sessions');

  const {
    data: matches,
    loading: loadingMatches,
    error: errorMatches,
    refetch: refetchMatches,
  } = useApi('/api/matches');

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setSearchParams({ tab: tabKey });
  };

  const filteredMatches =
    matches && activeSportFilter !== 'Semua'
      ? matches.filter((m) => m.sport_type === activeSportFilter)
      : matches;

  return (
    <div className="min-h-screen pb-16">
      {/* ─── HEADER HALAMAN SKETCH FOREST GREEN ─── */}
      <div className="bg-[#f4faf3] border-b-2 border-[#10240f] shadow-[0_2px_0px_rgba(16,36,15,0.06)] px-4 pt-10 pb-5 md:pt-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#418a3b] text-white border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f] rounded-xl flex items-center justify-center shrink-0">
                <HistoryIcon className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-sketch text-[#10240f] tracking-wide">
                  Riwayat Pertandingan
                </h1>
                <p className="text-xs font-mono font-semibold text-slate-600">
                  Rekam jejak sesi mabar & papan skor multi-sport
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (activeTab === 'sessions') refetchSessions();
                else refetchMatches();
              }}
              title="Perbarui Data"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-[#10240f] shadow-[1.5px_1.5px_0px_#10240f] hover:bg-[#e6f4e4] rounded-full text-xs font-bold text-[#10240f] transition-all active:translate-x-0.5 active:translate-y-0.5"
            >
              <RefreshIcon className="w-3.5 h-3.5" />
              <span>Perbarui</span>
            </button>
          </div>

          {/* ─── DUAL-CATEGORY TABS SKETCH ─── */}
          <div className="grid grid-cols-2 p-1.5 bg-[#e6f4e4] rounded-2xl gap-1.5 border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f]">
            <button
              type="button"
              onClick={() => handleTabChange('sessions')}
              className={`py-2 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all min-w-0 ${
                activeTab === 'sessions'
                  ? 'bg-[#418a3b] text-white border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f]'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <ShuttlecockIcon className="w-4 h-4 shrink-0" />
              <span className="font-sketch text-sm sm:text-base truncate">Sesi Match Making</span>
              {sessions && sessions.length > 0 && (
                <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full font-black shrink-0 ${
                  activeTab === 'sessions' ? 'bg-white text-[#254423]' : 'bg-[#f4faf3] text-[#10240f] border border-[#10240f]'
                }`}>
                  {sessions.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('regular')}
              className={`py-2 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all min-w-0 ${
                activeTab === 'regular'
                  ? 'bg-[#418a3b] text-white border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f]'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <ScoreboardIcon className="w-4 h-4 shrink-0" />
              <span className="font-sketch text-sm sm:text-base truncate">Match Reguler</span>
              {matches && matches.length > 0 && (
                <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full font-black shrink-0 ${
                  activeTab === 'regular' ? 'bg-white text-[#254423]' : 'bg-[#f4faf3] text-[#10240f] border border-[#10240f]'
                }`}>
                  {matches.length}
                </span>
              )}
            </button>
          </div>

          {/* Sub-filter untuk Match Reguler */}
          {activeTab === 'regular' && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide animate-fade-in">
              {SPORT_FILTER_OPTIONS.map((sport) => (
                <button
                  key={sport}
                  onClick={() => setActiveSportFilter(sport)}
                  className={`shrink-0 px-3.5 py-1 rounded-full text-xs font-bold border-1.5 border-[#10240f] transition-all ${
                    activeSportFilter === sport
                      ? 'bg-[#10240f] text-white shadow-[2px_2px_0px_#418a3b]'
                      : 'bg-white text-slate-700 shadow-[1px_1px_0px_#10240f] hover:bg-[#e6f4e4]'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── KONTEN RIWAYAT ─── */}
      <div className="max-w-2xl mx-auto px-4 py-5">
        {/* ─── TAB 1: SESI MATCH MAKING (BADMINTON) ─── */}
        {activeTab === 'sessions' && (
          <div>
            {loadingSessions && <LoadingSpinner message="Memuat riwayat sesi..." />}

            {errorSessions && !loadingSessions && (
              <div className="card text-center py-12">
                <p className="text-slate-900 font-bold mb-1">Gagal memuat riwayat sesi</p>
                <p className="text-slate-500 text-xs mb-4">{errorSessions}</p>
                <button onClick={refetchSessions} className="btn-primary text-xs">
                  <RefreshIcon className="w-3.5 h-3.5" />
                  <span>Coba Lagi</span>
                </button>
              </div>
            )}

            {!loadingSessions && !errorSessions && sessions && sessions.length === 0 && (
              <div className="card text-center py-16">
                <div className="w-12 h-12 bg-[#e6f4e4] text-[#254423] border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f] rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShuttlecockIcon className="w-6 h-6" />
                </div>
                <p className="text-[#10240f] font-bold font-sketch text-xl mb-1">Belum Ada Sesi Match Making</p>
                <p className="text-slate-600 text-xs max-w-sm mx-auto mb-4 font-medium">
                  Mulai rotasi pemain badminton dan catat seluruh pertandingannya di halaman Match Making.
                </p>
                <a
                  href="/matchmaking"
                  className="btn-primary text-xs py-2 px-4 font-bold"
                >
                  <span>Mulai Sesi Baru</span>
                </a>
              </div>
            )}

            {!loadingSessions && !errorSessions && sessions && sessions.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500 px-1">
                  <span>Daftar Sesi Badminton ({sessions.length})</span>
                  <span>Pilih untuk rincian</span>
                </div>

                {sessions.map((session) => (
                  <SessionHistoryCard
                    key={session.id}
                    session={session}
                    onClick={() => setSelectedSession(session)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 2: MATCH REGULER (SCOREBOARD MULTI-SPORT) ─── */}
        {activeTab === 'regular' && (
          <div>
            {loadingMatches && <LoadingSpinner message="Memuat riwayat pertandingan..." />}

            {errorMatches && !loadingMatches && (
              <div className="card text-center py-12">
                <p className="text-slate-900 font-bold mb-1">Gagal memuat riwayat pertandingan</p>
                <p className="text-slate-500 text-xs mb-4">{errorMatches}</p>
                <button onClick={refetchMatches} className="btn-primary text-xs">
                  <RefreshIcon className="w-3.5 h-3.5" />
                  <span>Coba Lagi</span>
                </button>
              </div>
            )}

            {!loadingMatches && !errorMatches && filteredMatches && filteredMatches.length === 0 && (
              <div className="card text-center py-16">
                <div className="w-12 h-12 bg-[#e6f4e4] text-[#254423] border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f] rounded-full flex items-center justify-center mx-auto mb-3">
                  <ScoreboardIcon className="w-6 h-6" />
                </div>
                <p className="text-[#10240f] font-bold font-sketch text-xl mb-1">
                  {activeSportFilter === 'Semua'
                    ? 'Belum Ada Pertandingan Reguler'
                    : `Belum Ada Pertandingan ${activeSportFilter}`}
                </p>
                <p className="text-slate-600 text-xs max-w-sm mx-auto mb-4 font-medium">
                  Gunakan halaman Scoreboard untuk mencatat skor pertandingan tunggal multi-sport.
                </p>
                <a
                  href="/scoreboard"
                  className="btn-primary text-xs py-2 px-4 font-bold"
                >
                  <span>Buka Scoreboard</span>
                </a>
              </div>
            )}

            {!loadingMatches && !errorMatches && filteredMatches && filteredMatches.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500 px-1">
                  <span>
                    {activeSportFilter === 'Semua'
                      ? `Semua Pertandingan (${filteredMatches.length})`
                      : `${activeSportFilter} (${filteredMatches.length})`}
                  </span>
                  <span>Pilih untuk rincian</span>
                </div>

                {filteredMatches.map((match) => (
                  <div
                    key={match.id}
                    onClick={() => setSelectedMatch(match)}
                    className="cursor-pointer"
                  >
                    <MatchHistoryItem match={match} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── MODAL DETAIL SESI ─── */}
      {selectedSession && (
        <SessionDetailModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}

      {/* ─── MODAL DETAIL MATCH REGULER ─── */}
      {selectedMatch && (
        <MatchDetailModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  );
}

export default HistoryPage;
