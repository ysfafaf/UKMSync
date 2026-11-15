// Halaman Scoreboard - Papan Skor Multi-Sport (Sketch Design System - Forest Green Edition)
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config/api.js';
import SportBadge from '../components/SportBadge.jsx';
import {
  ScoreboardIcon,
  PlayIcon,
  PauseIcon,
  RefreshIcon,
  MinusIcon,
  ShuttlecockIcon,
  BasketballIcon,
  VolleyballIcon,
  SoccerIcon,
  CheckIcon,
} from '../components/Icons.jsx';

const SPORTS = [
  { name: 'Badminton', icon: ShuttlecockIcon },
  { name: 'Basket', icon: BasketballIcon },
  { name: 'Voli', icon: VolleyballIcon },
  { name: 'Futsal', icon: SoccerIcon },
];

function ScoreboardPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const matchState = location.state;

  const [isSetup, setIsSetup] = useState(true);
  const [sportType, setSportType] = useState(matchState?.sport_type || 'Badminton');
  const [teamAName, setTeamAName] = useState(matchState?.team_a_name || '');
  const [teamBName, setTeamBName] = useState(matchState?.team_b_name || '');

  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (matchState?.team_a_name && matchState?.team_b_name) {
      setIsSetup(false);
      setIsRunning(true);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStartMatch = () => {
    if (!teamAName.trim() || !teamBName.trim()) {
      return;
    }
    setIsSetup(false);
    setIsRunning(true);
    setScoreA(0);
    setScoreB(0);
    setSeconds(0);
  };

  const addScore = (team, delta) => {
    if (team === 'A') {
      setScoreA((prev) => Math.max(0, prev + delta));
    } else {
      setScoreB((prev) => Math.max(0, prev + delta));
    }
  };

  const handleReset = () => {
    setScoreA(0);
    setScoreB(0);
    setSeconds(0);
    setIsRunning(false);
  };

  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaveError('');
    setIsRunning(false);

    try {
      const response = await fetch(`${API_BASE_URL}/api/matches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport_type: sportType,
          team_a_name: teamAName.trim(),
          team_b_name: teamBName.trim(),
          score_a: scoreA,
          score_b: scoreB,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Gagal menyimpan pertandingan');
      }

      navigate('/history?tab=regular');
    } catch (err) {
      setSaveError(err.message);
      setSaving(false);
      setIsRunning(true);
    }
  }, [sportType, teamAName, teamBName, scoreA, scoreB, navigate]);

  // ============ FORM SETUP ============
  if (isSetup) {
    return (
      <div className="min-h-screen pb-16">
        {/* Header Sketch */}
        <div className="bg-[#f4faf3] border-b-2 border-[#10240f] shadow-[0_2px_0px_rgba(16,36,15,0.05)] px-4 pt-10 pb-5 md:pt-6">
          <div className="max-w-xl mx-auto flex items-center gap-3">
            <div className="w-10 h-10 bg-[#418a3b] text-white border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f] rounded-xl flex items-center justify-center shrink-0">
              <ScoreboardIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-sketch text-[#10240f] tracking-wide">
                Papan Skor Digital
              </h1>
              <p className="text-xs font-mono font-semibold text-slate-600">
                Pencatat skor langsung untuk 4 cabang olahraga
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-xl mx-auto px-4 py-6">
          <div className="card space-y-5">
            {/* Pilihan Olahraga */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#10240f] uppercase tracking-wider mb-2">
                Pilih Cabang Olahraga
              </label>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {SPORTS.map((item) => {
                  const selected = sportType === item.name;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setSportType(item.name)}
                      className={`p-3 rounded-xl border-2 border-[#10240f] text-center font-bold text-xs transition-all flex flex-col items-center gap-2 ${
                        selected
                          ? 'bg-[#418a3b] text-white shadow-[3px_3px_0px_#10240f] translate-x-[1px] translate-y-[1px]'
                          : 'bg-white text-slate-700 shadow-[2px_2px_0px_#10240f] hover:bg-[#e6f4e4]'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${selected ? 'text-white' : 'text-[#418a3b]'}`} />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nama Tim A */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#10240f] uppercase tracking-wider mb-1.5">
                Nama Tim A / Pemain 1
              </label>
              <input
                type="text"
                value={teamAName}
                onChange={(e) => setTeamAName(e.target.value)}
                placeholder="cth: Teknik Komputer A"
                className="input-field"
              />
            </div>

            {/* Nama Tim B */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#10240f] uppercase tracking-wider mb-1.5">
                Nama Tim B / Pemain 2
              </label>
              <input
                type="text"
                value={teamBName}
                onChange={(e) => setTeamBName(e.target.value)}
                placeholder="cth: Teknik Elektro B"
                className="input-field"
              />
            </div>

            {/* Tombol Mulai */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleStartMatch}
                disabled={!teamAName.trim() || !teamBName.trim()}
                className="w-full btn-primary py-3 text-sm font-bold"
              >
                <PlayIcon className="w-4 h-4" />
                <span>Mulai Pertandingan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ SCOREBOARD AKTIF ============
  return (
    <div className="min-h-screen pb-16">
      {/* Header Sticky Papan Skor Sketch */}
      <div className="sticky top-0 z-40 bg-[#f4faf3]/95 backdrop-blur-sm border-b-2 border-[#10240f] px-4 py-3 shadow-[0_2px_0px_rgba(16,36,15,0.06)]">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SportBadge sport={sportType} />
            <span className="text-xs font-mono font-semibold text-slate-600 hidden sm:inline">Pertandingan Langsung</span>
          </div>

          {/* Timer Sketch */}
          <div className="flex items-center gap-2 bg-white border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f] px-3.5 py-1 rounded-full font-mono text-xs font-black text-[#10240f]">
            <span>{formatTime(seconds)}</span>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="text-slate-600 hover:text-[#418a3b] transition-colors ml-0.5"
              title={isRunning ? 'Jeda Timer' : 'Mulai Timer'}
            >
              {isRunning ? <PauseIcon className="w-3.5 h-3.5" /> : <PlayIcon className="w-3.5 h-3.5" />}
            </button>
          </div>

          <button
            onClick={() => setIsSetup(true)}
            className="btn-secondary py-1 px-3 text-xs"
          >
            Ubah Tim
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {saveError && (
          <div className="p-3 bg-[#FFF1F2] border-2 border-[#DC2626] text-[#DC2626] text-xs font-bold rounded-xl shadow-[2px_2px_0px_#10240f]">
            {saveError}
          </div>
        )}

        {/* Dua Papan Skor Besar */}
        <div className="grid grid-cols-2 gap-4">
          {/* Tim A Panel */}
          <div className="card p-3.5 sm:p-6 text-center flex flex-col justify-between overflow-hidden min-w-0">
            <div className="overflow-hidden max-w-full">
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#e6f4e4] text-[#254423] border border-[#10240f] shadow-[1px_1px_0px_#10240f] uppercase tracking-wider mb-1">
                Tim A
              </span>
              <h2 className="text-base sm:text-xl font-bold font-sketch text-[#10240f] mt-1 truncate" title={teamAName}>
                {teamAName}
              </h2>
            </div>

            <div className="my-6 sm:my-8 bg-[#f4faf3] border-2 border-dashed border-[#10240f] rounded-2xl py-4 sm:py-6 shadow-[2px_2px_0px_#10240f]">
              <span className="text-6xl sm:text-8xl font-black font-mono text-[#10240f] tracking-tight">
                {scoreA}
              </span>
            </div>

            <div className="flex gap-2 justify-center">
              <button
                onClick={() => addScore('A', -1)}
                disabled={scoreA === 0}
                className="w-12 h-12 rounded-full bg-white border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f] hover:bg-[#e6f4e4] active:translate-x-0.5 active:translate-y-0.5 text-[#10240f] font-bold flex items-center justify-center disabled:opacity-30 transition-all"
                title="Kurangi 1 poin"
              >
                <MinusIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => addScore('A', 1)}
                className="flex-1 h-12 rounded-full bg-[#418a3b] text-white font-mono font-black text-xl border-2 border-[#10240f] shadow-[3px_3px_0px_#10240f] hover:bg-[#32672e] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center transition-all"
                title="Tambah 1 poin"
              >
                +1
              </button>
            </div>
          </div>

          {/* Tim B Panel */}
          <div className="card p-3.5 sm:p-6 text-center flex flex-col justify-between overflow-hidden min-w-0">
            <div className="overflow-hidden max-w-full">
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FEF3C7] text-[#92400E] border border-[#10240f] shadow-[1px_1px_0px_#10240f] uppercase tracking-wider mb-1">
                Tim B
              </span>
              <h2 className="text-base sm:text-xl font-bold font-sketch text-[#10240f] mt-1 truncate" title={teamBName}>
                {teamBName}
              </h2>
            </div>

            <div className="my-6 sm:my-8 bg-[#f4faf3] border-2 border-dashed border-[#10240f] rounded-2xl py-4 sm:py-6 shadow-[2px_2px_0px_#10240f]">
              <span className="text-6xl sm:text-8xl font-black font-mono text-[#10240f] tracking-tight">
                {scoreB}
              </span>
            </div>

            <div className="flex gap-2 justify-center">
              <button
                onClick={() => addScore('B', -1)}
                disabled={scoreB === 0}
                className="w-12 h-12 rounded-full bg-white border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f] hover:bg-[#e6f4e4] active:translate-x-0.5 active:translate-y-0.5 text-[#10240f] font-bold flex items-center justify-center disabled:opacity-30 transition-all"
                title="Kurangi 1 poin"
              >
                <MinusIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => addScore('B', 1)}
                className="flex-1 h-12 rounded-full bg-[#418a3b] text-white font-mono font-black text-xl border-2 border-[#10240f] shadow-[3px_3px_0px_#10240f] hover:bg-[#32672e] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center transition-all"
                title="Tambah 1 poin"
              >
                +1
              </button>
            </div>
          </div>
        </div>

        {/* Tombol Kontrol Bawah */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleReset}
            className="btn-secondary py-3 text-xs sm:text-sm"
          >
            <RefreshIcon className="w-4 h-4" />
            <span>Reset Skor</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary py-3 text-xs sm:text-sm"
          >
            <CheckIcon className="w-4 h-4" />
            <span>{saving ? 'Menyimpan...' : 'Simpan Pertandingan'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScoreboardPage;
