// Komponen Modal Detail Match Reguler (Single Match) - Sketch Design System (Malibu Theme)
import React from 'react';
import SportBadge from './SportBadge.jsx';
import { CloseIcon, TrophyIcon } from './Icons.jsx';

function MatchDetailModal({ match, onClose }) {
  if (!match) return null;

  const { sport_type, team_a_name, team_b_name, score_a, score_b, match_date } = match;

  const teamAWon = score_a > score_b;
  const teamBWon = score_b > score_a;
  const isDraw = score_a === score_b;

  const formattedDate = new Date(match_date).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl border-3 border-[#233148] shadow-[6px_6px_0px_#233148] w-full max-w-md overflow-hidden animate-scale-up flex flex-col max-h-[92vh]">
        {/* Header Modal */}
        <div className="bg-[#4b82c5] border-b-2 border-[#233148] px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <SportBadge sport={sport_type} />
            <span className="text-xs font-mono font-bold text-white tracking-wide truncate">
              Detail Match
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white hover:bg-[#e2eef7] text-[#233148] border border-[#233148] shadow-[1px_1px_0px_#233148] flex items-center justify-center transition-all active:translate-x-0.5 active:translate-y-0.5 shrink-0 ml-2"
            aria-label="Tutup"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="p-4 sm:p-6 space-y-4 bg-[#f2f8fc] overflow-y-auto">
          {/* Header Info Match */}
          <div className="text-center px-1">
            <span className="inline-block text-[11px] font-mono font-bold text-slate-500 mb-1">
              {formattedDate}
            </span>
            <div className="bg-white border-2 border-[#233148] rounded-xl p-2.5 shadow-[2px_2px_0px_#233148]">
              <p className="font-sketch text-lg sm:text-xl font-bold text-[#233148] break-words leading-tight">
                {team_a_name}
              </p>
              <div className="my-1 flex items-center justify-center gap-2">
                <span className="h-[1px] bg-slate-300 w-12"></span>
                <span className="font-mono text-[11px] font-bold text-slate-400 uppercase">VS</span>
                <span className="h-[1px] bg-slate-300 w-12"></span>
              </div>
              <p className="font-sketch text-lg sm:text-xl font-bold text-[#233148] break-words leading-tight">
                {team_b_name}
              </p>
            </div>
          </div>

          {/* Big Score Board Container - Ter-contain rapi */}
          <div className="bg-[#e2eef7] rounded-2xl border-2 border-[#233148] shadow-[3px_3px_0px_#233148] p-3 sm:p-4">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 items-stretch">
              {/* Card Tim A */}
              <div
                className={`p-3 rounded-xl border-2 border-[#233148] bg-white text-center flex flex-col justify-between shadow-[2px_2px_0px_#233148] overflow-hidden min-w-0 ${
                  teamAWon ? 'ring-2 ring-[#4b82c5]' : ''
                }`}
              >
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#e2eef7] text-[#3a5b93] border border-[#233148] shadow-[1px_1px_0px_#233148] uppercase tracking-wider mb-1.5">
                    Tim A
                  </span>
                  <p
                    className="font-bold text-xs sm:text-sm text-[#233148] leading-snug line-clamp-2 break-words max-w-full"
                    title={team_a_name}
                  >
                    {team_a_name}
                  </p>
                </div>

                <div className="my-3 py-2 bg-[#f2f8fc] rounded-lg border border-dashed border-[#233148]/40">
                  <span
                    className={`text-4xl sm:text-5xl font-black font-mono tracking-tight block ${
                      teamAWon ? 'text-[#4b82c5]' : 'text-[#233148]'
                    }`}
                  >
                    {score_a}
                  </span>
                </div>

                <div className="h-6 flex items-center justify-center">
                  {teamAWon ? (
                    <span className="inline-flex items-center gap-1 text-[10px] bg-[#e2eef7] text-[#3a5b93] font-bold px-2 py-0.5 rounded-full border border-[#233148] shadow-[1px_1px_0px_#233148]">
                      <TrophyIcon className="w-3 h-3 text-[#4b82c5]" />
                      <span>Pemenang</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">Skor Akhir</span>
                  )}
                </div>
              </div>

              {/* Card Tim B */}
              <div
                className={`p-3 rounded-xl border-2 border-[#233148] bg-white text-center flex flex-col justify-between shadow-[2px_2px_0px_#233148] overflow-hidden min-w-0 ${
                  teamBWon ? 'ring-2 ring-[#4b82c5]' : ''
                }`}
              >
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FEF3C7] text-[#92400E] border border-[#233148] shadow-[1px_1px_0px_#233148] uppercase tracking-wider mb-1.5">
                    Tim B
                  </span>
                  <p
                    className="font-bold text-xs sm:text-sm text-[#233148] leading-snug line-clamp-2 break-words max-w-full"
                    title={team_b_name}
                  >
                    {team_b_name}
                  </p>
                </div>

                <div className="my-3 py-2 bg-[#f2f8fc] rounded-lg border border-dashed border-[#233148]/40">
                  <span
                    className={`text-4xl sm:text-5xl font-black font-mono tracking-tight block ${
                      teamBWon ? 'text-[#4b82c5]' : 'text-[#233148]'
                    }`}
                  >
                    {score_b}
                  </span>
                </div>

                <div className="h-6 flex items-center justify-center">
                  {teamBWon ? (
                    <span className="inline-flex items-center gap-1 text-[10px] bg-[#e2eef7] text-[#3a5b93] font-bold px-2 py-0.5 rounded-full border border-[#233148] shadow-[1px_1px_0px_#233148]">
                      <TrophyIcon className="w-3 h-3 text-[#4b82c5]" />
                      <span>Pemenang</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">Skor Akhir</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Status Hasil Pertandingan */}
          {isDraw ? (
            <div className="text-center p-2.5 bg-white rounded-xl border-2 border-[#233148] shadow-[2px_2px_0px_#233148]">
              <span className="text-xs font-bold text-slate-800">
                Pertandingan Berakhir Imbang (Seri)
              </span>
            </div>
          ) : (
            <div className="text-center p-2.5 bg-white rounded-xl border-2 border-[#233148] shadow-[2px_2px_0px_#233148] flex items-center justify-center gap-1.5 text-xs font-bold text-[#233148]">
              <TrophyIcon className="w-4 h-4 text-[#4b82c5]" />
              <span>
                Pemenang:{' '}
                <span className="text-[#4b82c5] underline">
                  {teamAWon ? team_a_name : team_b_name}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="bg-white border-t-2 border-[#233148] px-5 py-3 flex justify-end shrink-0">
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

export default MatchDetailModal;
