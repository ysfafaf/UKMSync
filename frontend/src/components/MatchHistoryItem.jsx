// Komponen item riwayat pertandingan reguler - Sketch Design System
import React from 'react';
import SportBadge from './SportBadge.jsx';
import { ArrowRightIcon, TrophyIcon } from './Icons.jsx';

function MatchHistoryItem({ match }) {
  const {
    sport_type,
    team_a_name,
    team_b_name,
    score_a,
    score_b,
    match_date,
  } = match;

  const teamAWon = score_a > score_b;
  const teamBWon = score_b > score_a;
  const isDraw = score_a === score_b;

  const formattedDate = new Date(match_date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="card hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#111827] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 group bg-white overflow-hidden">
      {/* Header: badge olahraga + tanggal */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <SportBadge sport={sport_type} />
        <span className="text-xs font-mono font-bold text-slate-500 shrink-0">{formattedDate}</span>
      </div>

      {/* Kontainer Skor Vertikal yang Ter-contain Sempurna */}
      <div className="space-y-2">
        {/* Tim A Row */}
        <div
          className={`flex items-center justify-between gap-3 p-2.5 rounded-xl border-2 transition-colors ${
            teamAWon
              ? 'bg-[#E8F7F5] border-[#111827]'
              : 'bg-[#FAF6EE] border-[#111827]/40'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-white/80 border border-[#111827]/30 px-1.5 py-0.2 rounded shrink-0">
              Tim A
            </span>
            <p
              className={`font-bold text-xs sm:text-sm truncate ${
                teamAWon ? 'text-[#0F766E]' : 'text-[#111827]'
              }`}
              title={team_a_name}
            >
              {team_a_name}
            </p>
            {teamAWon && (
              <span className="inline-flex items-center gap-1 text-[10px] bg-white text-[#0F766E] font-bold px-2 py-0.2 rounded-full border border-[#111827] shadow-[1px_1px_0px_#111827] shrink-0">
                <TrophyIcon className="w-2.5 h-2.5 text-[#1DAD97]" />
                <span>Menang</span>
              </span>
            )}
          </div>
          <span
            className={`font-mono text-base sm:text-lg font-black px-2.5 py-0.5 rounded-lg border-2 border-[#111827] bg-white shadow-[1px_1px_0px_#111827] shrink-0 ${
              teamAWon ? 'text-[#1DAD97]' : 'text-[#111827]'
            }`}
          >
            {score_a}
          </span>
        </div>

        {/* Tim B Row */}
        <div
          className={`flex items-center justify-between gap-3 p-2.5 rounded-xl border-2 transition-colors ${
            teamBWon
              ? 'bg-[#E8F7F5] border-[#111827]'
              : 'bg-[#FAF6EE] border-[#111827]/40'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-white/80 border border-[#111827]/30 px-1.5 py-0.2 rounded shrink-0">
              Tim B
            </span>
            <p
              className={`font-bold text-xs sm:text-sm truncate ${
                teamBWon ? 'text-[#0F766E]' : 'text-[#111827]'
              }`}
              title={team_b_name}
            >
              {team_b_name}
            </p>
            {teamBWon && (
              <span className="inline-flex items-center gap-1 text-[10px] bg-white text-[#0F766E] font-bold px-2 py-0.2 rounded-full border border-[#111827] shadow-[1px_1px_0px_#111827] shrink-0">
                <TrophyIcon className="w-2.5 h-2.5 text-[#1DAD97]" />
                <span>Menang</span>
              </span>
            )}
          </div>
          <span
            className={`font-mono text-base sm:text-lg font-black px-2.5 py-0.5 rounded-lg border-2 border-[#111827] bg-white shadow-[1px_1px_0px_#111827] shrink-0 ${
              teamBWon ? 'text-[#1DAD97]' : 'text-[#111827]'
            }`}
          >
            {score_b}
          </span>
        </div>
      </div>

      {/* Footer Info / Indikator Hasil */}
      <div className="mt-2.5 pt-2 border-t-2 border-dashed border-[#F4EDE0] flex items-center justify-between text-xs">
        {isDraw ? (
          <span className="text-[10px] font-bold font-mono text-slate-600 bg-[#F4EDE0] border border-[#111827] px-2 py-0.5 rounded-full">
            Hasil Imbang (Seri)
          </span>
        ) : (
          <span className="text-[11px] font-mono text-slate-500 font-semibold truncate mr-2">
            Pemenang:{' '}
            <strong className="text-[#1DAD97] font-bold">
              {teamAWon ? team_a_name : team_b_name}
            </strong>
          </span>
        )}
        <span className="text-xs font-bold text-[#1DAD97] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0 ml-auto">
          <span>Detail</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}

export default MatchHistoryItem;
