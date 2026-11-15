// Komponen Kartu Riwayat Sesi Match Making Badminton - Sketch Design System (Forest Green Edition)
import React from 'react';
import {
  ShuttlecockIcon,
  UsersIcon,
  CourtIcon,
  ClockIcon,
  TargetIcon,
  ArrowRightIcon,
} from './Icons.jsx';

function SessionHistoryCard({ session, onClick }) {
  const formattedDate = new Date(session.created_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const formatDuration = (seconds) => {
    if (!seconds || seconds <= 0) return '< 1 mnt';
    const mins = Math.round(seconds / 60);
    return `${mins} mnt`;
  };

  const matches = session.matches || [];

  return (
    <div
      onClick={onClick}
      className="card hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#10240f] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none cursor-pointer transition-all duration-150 group bg-white overflow-hidden"
    >
      {/* Header Kartu Sesi */}
      <div className="flex items-center justify-between mb-2.5 gap-2">
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#e6f4e4] text-[#254423] border-1.5 border-[#10240f] shadow-[1px_1px_0px_#10240f] shrink-0">
            <ShuttlecockIcon className="w-3.5 h-3.5" />
            <span>Sesi Badminton</span>
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-[#e6f4e4] text-[#10240f] border-1.5 border-[#10240f] shrink-0">
            {session.game_format === 'Double' ? 'Ganda (2v2)' : 'Tunggal (1v1)'}
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-slate-500 shrink-0">{formattedDate}</span>
      </div>

      {/* Judul Sesi */}
      <h3 className="text-base font-bold text-[#10240f] group-hover:text-[#418a3b] transition-colors mb-3 truncate" title={session.session_name || 'Sesi Mabar Badminton'}>
        {session.session_name || 'Sesi Mabar Badminton'}
      </h3>

      {/* Grid Statistik Ringkas */}
      <div className="grid grid-cols-4 gap-2 py-2 px-3 bg-[#e6f4e4] rounded-xl mb-3 text-center border-2 border-[#10240f] shadow-[1.5px_1.5px_0px_#10240f]">
        <div className="min-w-0 overflow-hidden">
          <span className="text-[10px] text-slate-600 flex items-center justify-center gap-1 uppercase font-bold truncate">
            <UsersIcon className="w-3 h-3 shrink-0" /> Pemain
          </span>
          <span className="text-xs font-black font-mono text-[#10240f]">{session.total_players}</span>
        </div>
        <div className="min-w-0 overflow-hidden">
          <span className="text-[10px] text-slate-600 flex items-center justify-center gap-1 uppercase font-bold truncate">
            <CourtIcon className="w-3 h-3 shrink-0" /> Lap
          </span>
          <span className="text-xs font-black font-mono text-[#10240f]">{session.court_count}</span>
        </div>
        <div className="min-w-0 overflow-hidden">
          <span className="text-[10px] text-slate-600 flex items-center justify-center gap-1 uppercase font-bold truncate">
            <ClockIcon className="w-3 h-3 shrink-0" /> Durasi
          </span>
          <span className="text-xs font-black font-mono text-[#10240f]">{formatDuration(session.duration_seconds)}</span>
        </div>
        <div className="min-w-0 overflow-hidden">
          <span className="text-[10px] text-slate-600 flex items-center justify-center gap-1 uppercase font-bold truncate">
            <TargetIcon className="w-3 h-3 shrink-0" /> Match
          </span>
          <span className="text-xs font-black font-mono text-[#10240f]">{session.total_matches}</span>
        </div>
      </div>

      {/* Mini Preview Match */}
      {matches.length > 0 && (
        <div className="space-y-1.5 border-t-2 border-dashed border-[#e6f4e4] pt-2.5 mb-2">
          {matches.slice(0, 2).map((m, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs text-slate-700 gap-2">
              <span className="truncate flex-1 min-w-0 font-semibold text-[#10240f]">
                L{m.court_number}: {m.team_a_name}
              </span>
              <span className="font-mono font-bold text-[#254423] bg-[#e6f4e4] border border-[#10240f] px-2 py-0.5 rounded text-[11px] shadow-[1px_1px_0px_#10240f] shrink-0">
                {m.score_a} - {m.score_b}
              </span>
              <span className="truncate flex-1 min-w-0 font-semibold text-[#10240f] text-right">
                {m.team_b_name}
              </span>
            </div>
          ))}
          {matches.length > 2 && (
            <p className="text-[11px] font-mono text-slate-500 text-center pt-1 font-semibold">
              +{matches.length - 2} pertandingan lainnya
            </p>
          )}
        </div>
      )}

      {/* Footer Kartu */}
      <div className="flex items-center justify-end text-xs font-bold text-[#418a3b] pt-1 group-hover:translate-x-0.5 transition-transform">
        <span>Rincian Sesi</span>
        <ArrowRightIcon className="w-3.5 h-3.5 ml-1" />
      </div>
    </div>
  );
}

export default SessionHistoryCard;
