// Komponen Modal Detail Sesi Match Making Badminton - Sketch Design System
import React from 'react';
import {
  ShuttlecockIcon,
  UsersIcon,
  CourtIcon,
  ClockIcon,
  TargetIcon,
  CloseIcon,
} from './Icons.jsx';

function SessionDetailModal({ session, onClose }) {
  if (!session) return null;

  const formattedDate = new Date(session.created_at).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const formatDuration = (seconds) => {
    if (!seconds || seconds <= 0) return '0 menit';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins >= 60) {
      const hrs = Math.floor(mins / 60);
      const remainingMins = mins % 60;
      return `${hrs} jam ${remainingMins} menit`;
    }
    return `${mins} menit ${secs > 0 ? `${secs} dtk` : ''}`;
  };

  const playersList = Array.isArray(session.players)
    ? session.players
    : typeof session.players === 'string'
    ? JSON.parse(session.players || '[]')
    : [];

  const matchesList = session.matches || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl border-3 border-[#111827] shadow-[6px_6px_0px_#111827] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up">
        {/* Header Modal Sketch */}
        <div className="bg-[#1DAD97] text-white px-5 sm:px-6 py-4 sm:py-5 flex items-start justify-between border-b-2 border-[#111827] shrink-0">
          <div className="min-w-0 flex-1 mr-2">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-[#111827] border border-[#111827] shadow-[1px_1px_0px_#111827] shrink-0">
                <ShuttlecockIcon className="w-3.5 h-3.5 text-[#1DAD97]" />
                <span>Sesi Badminton</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F4EDE0] text-[#111827] border border-[#111827] shrink-0">
                {session.game_format === 'Double' ? 'Ganda (Double)' : 'Tunggal (Single)'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-sketch tracking-wide text-white truncate" title={session.session_name || 'Sesi Mabar Badminton'}>
              {session.session_name || 'Sesi Mabar Badminton'}
            </h2>
            <p className="text-xs font-mono text-[#F4EDE0] font-semibold mt-0.5 truncate">{formattedDate}</p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white hover:bg-[#F4EDE0] text-[#111827] border-2 border-[#111827] shadow-[2px_2px_0px_#111827] flex items-center justify-center transition-all active:translate-x-0.5 active:translate-y-0.5 shrink-0"
            aria-label="Tutup"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Konten Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#FAF6EE]">
          {/* Ringkasan Statistik Sesi */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="bg-white border-2 border-[#111827] shadow-[2px_2px_0px_#111827] rounded-xl p-2.5 sm:p-3 text-center min-w-0 overflow-hidden">
              <span className="text-[10px] text-slate-500 flex items-center justify-center gap-1 uppercase font-bold truncate">
                <UsersIcon className="w-3 h-3 shrink-0" /> Pemain
              </span>
              <span className="text-base sm:text-lg font-black font-mono text-[#111827] mt-0.5 block">
                {session.total_players || playersList.length}
              </span>
            </div>
            <div className="bg-white border-2 border-[#111827] shadow-[2px_2px_0px_#111827] rounded-xl p-2.5 sm:p-3 text-center min-w-0 overflow-hidden">
              <span className="text-[10px] text-slate-500 flex items-center justify-center gap-1 uppercase font-bold truncate">
                <CourtIcon className="w-3 h-3 shrink-0" /> Lapangan
              </span>
              <span className="text-base sm:text-lg font-black font-mono text-[#111827] mt-0.5 block">
                {session.court_count}
              </span>
            </div>
            <div className="bg-white border-2 border-[#111827] shadow-[2px_2px_0px_#111827] rounded-xl p-2.5 sm:p-3 text-center min-w-0 overflow-hidden">
              <span className="text-[10px] text-slate-500 flex items-center justify-center gap-1 uppercase font-bold truncate">
                <ClockIcon className="w-3 h-3 shrink-0" /> Durasi
              </span>
              <span className="text-xs font-black font-mono text-[#111827] mt-1.5 block truncate">
                {formatDuration(session.duration_seconds)}
              </span>
            </div>
            <div className="bg-white border-2 border-[#111827] shadow-[2px_2px_0px_#111827] rounded-xl p-2.5 sm:p-3 text-center min-w-0 overflow-hidden">
              <span className="text-[10px] text-slate-500 flex items-center justify-center gap-1 uppercase font-bold truncate">
                <TargetIcon className="w-3 h-3 shrink-0" /> Match
              </span>
              <span className="text-base sm:text-lg font-black font-mono text-[#111827] mt-0.5 block">
                {matchesList.length}
              </span>
            </div>
          </div>

          {/* Daftar Pemain Lengkap */}
          <div className="bg-white border-2 border-[#111827] shadow-[2px_2px_0px_#111827] rounded-2xl p-4 overflow-hidden">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-2">
              <UsersIcon className="w-4 h-4 text-[#1DAD97] shrink-0" />
              <span>Daftar Pemain Terdaftar ({playersList.length})</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {playersList.map((player, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#F4EDE0] border border-[#111827] text-slate-900 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-[1px_1px_0px_#111827] max-w-full truncate"
                >
                  <span className="w-2 h-2 rounded-full bg-[#1DAD97] border border-[#111827] shrink-0"></span>
                  <span className="truncate">{player}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Hasil Pertandingan Sesi */}
          <div className="bg-white border-2 border-[#111827] shadow-[2px_2px_0px_#111827] rounded-2xl p-4 overflow-hidden">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <TargetIcon className="w-4 h-4 text-[#1DAD97] shrink-0" />
              <span>Hasil Pertandingan Sesi ({matchesList.length})</span>
            </h3>

            {matchesList.length === 0 ? (
              <p className="text-xs text-slate-500 italic">Tidak ada catatan pertandingan untuk sesi ini.</p>
            ) : (
              <div className="space-y-2.5">
                {matchesList.map((m, idx) => {
                  const teamAWon = m.score_a > m.score_b;
                  const teamBWon = m.score_b > m.score_a;
                  const isDraw = m.score_a === m.score_b && (m.score_a > 0 || m.score_b > 0);

                  return (
                    <div
                      key={m.id || idx}
                      className="border-2 border-[#111827] rounded-xl p-3 bg-[#FAF6EE] shadow-[1.5px_1.5px_0px_#111827] overflow-hidden"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-600 mb-2 font-mono gap-2">
                        <span className="font-bold text-[#0F766E] bg-[#E8F7F5] border border-[#111827] px-2 py-0.5 rounded shadow-[1px_1px_0px_#111827] shrink-0">
                          Match #{m.match_number || idx + 1}
                        </span>
                        <span className="bg-white border border-[#111827] text-slate-700 px-2 py-0.5 rounded font-semibold shrink-0">
                          Lapangan {m.court_number}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2 sm:gap-3">
                        {/* Tim A */}
                        <div className="flex-1 min-w-0 text-right">
                          <p
                            className={`text-xs sm:text-sm font-bold truncate ${
                              teamAWon ? 'text-[#1DAD97]' : 'text-slate-800'
                            }`}
                            title={m.team_a_name}
                          >
                            {m.team_a_name}
                            {teamAWon && (
                              <span className="ml-1 text-[10px] text-[#1DAD97] font-semibold hidden sm:inline">
                                (Menang)
                              </span>
                            )}
                          </p>
                        </div>

                        {/* Skor */}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg border-2 border-[#111827] shadow-[1px_1px_0px_#111827] shrink-0 font-mono">
                          <span
                            className={`text-sm sm:text-base font-black w-5 sm:w-6 text-center ${
                              teamAWon ? 'text-[#1DAD97]' : 'text-[#111827]'
                            }`}
                          >
                            {m.score_a}
                          </span>
                          <span className="text-[#111827] font-bold">:</span>
                          <span
                            className={`text-sm sm:text-base font-black w-5 sm:w-6 text-center ${
                              teamBWon ? 'text-[#1DAD97]' : 'text-[#111827]'
                            }`}
                          >
                            {m.score_b}
                          </span>
                        </div>

                        {/* Tim B */}
                        <div className="flex-1 min-w-0 text-left">
                          <p
                            className={`text-xs sm:text-sm font-bold truncate ${
                              teamBWon ? 'text-[#1DAD97]' : 'text-slate-800'
                            }`}
                            title={m.team_b_name}
                          >
                            {m.team_b_name}
                            {teamBWon && (
                              <span className="ml-1 text-[10px] text-[#1DAD97] font-semibold hidden sm:inline">
                                (Menang)
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {isDraw && (
                        <div className="mt-1.5 text-center">
                          <span className="text-[10px] font-bold text-slate-700 bg-[#F4EDE0] border border-[#111827] px-2 py-0.2 rounded-full inline-block">
                            Hasil Imbang
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer Modal */}
        <div className="border-t-2 border-[#111827] px-5 sm:px-6 py-3.5 bg-white flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="btn-secondary py-1.5 px-5 text-xs font-bold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default SessionDetailModal;
