// Halaman Match Making Badminton - Sketch Design System
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api.js';
import {
  MatchMakingIcon,
  ShuttlecockIcon,
  UsersIcon,
  CourtIcon,
  ClockIcon,
  TargetIcon,
  PlusIcon,
  MinusIcon,
  ExpandIcon,
  CloseIcon,
  CheckIcon,
} from '../components/Icons.jsx';

const SAMPLE_PLAYERS_8 = [
  'Fajar Alfian',
  'M. Rian Ardianto',
  'Kevin Sanjaya',
  'Marcus Gideon',
  'Hendra Setiawan',
  'Mohammad Ahsan',
  'Anthony Ginting',
  'Jonatan Christie',
];

const SAMPLE_PLAYERS_4 = [
  'Budi Santoso',
  'Dimas Arya',
  'Rizky Pratama',
  'Irfan Hakim',
];

function MatchMakingPage() {
  const navigate = useNavigate();

  // ─── STATE SETUP FORM ───────────────────────────────────────────────────────
  const [sessionName, setSessionName] = useState('Sesi Mabar Badminton');
  const [playerInput, setPlayerInput] = useState('');
  const [numCourts, setNumCourts] = useState(1);
  const [gameFormat, setGameFormat] = useState('Double');
  const [setupError, setSetupError] = useState('');

  // ─── STATE SESI AKTIF ───────────────────────────────────────────────────────
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [allSessionPlayers, setAllSessionPlayers] = useState([]);
  const [playerPlayCounts, setPlayerPlayCounts] = useState({});
  const [matches, setMatches] = useState([]);
  const [matchCounter, setMatchCounter] = useState(0);

  // ─── STATE MODAL & INTERAKSI ───────────────────────────────────────────────
  const [showEndModal, setShowEndModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [activeModalMatch, setActiveModalMatch] = useState(null);

  // Timer stopwatch sesi
  useEffect(() => {
    let interval = null;
    if (isSessionActive && sessionStartTime) {
      interval = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - sessionStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, sessionStartTime]);

  const formatTimer = (totalSecs) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const handleUseSample = (playersList) => {
    setPlayerInput(playersList.join('\n'));
    setSetupError('');
  };

  // ─── GENERATE ROUND/MATCH SECARA ADIL BERDASARKAN PLAY COUNT ───────────────
  const generateRoundMatches = (playersList, playCountsMap, startingMatchNum, courtCount, format) => {
    const playersPerCourt = format === 'Double' ? 4 : 2;
    const totalNeeded = courtCount * playersPerCourt;

    const sortedPlayers = [...playersList].sort((a, b) => {
      const countA = playCountsMap[a] || 0;
      const countB = playCountsMap[b] || 0;
      if (countA !== countB) return countA - countB;
      return Math.random() - 0.5;
    });

    const activeRoundPlayers = sortedPlayers.slice(0, totalNeeded);
    const shuffledRoundPlayers = shuffleArray(activeRoundPlayers);

    const newMatches = [];
    const newPlayCounts = { ...playCountsMap };

    for (let court = 0; court < courtCount; court++) {
      const startIdx = court * playersPerCourt;
      const courtPlayers = shuffledRoundPlayers.slice(startIdx, startIdx + playersPerCourt);

      if (courtPlayers.length < playersPerCourt) break;

      courtPlayers.forEach((p) => {
        newPlayCounts[p] = (newPlayCounts[p] || 0) + 1;
      });

      let teamAName = '';
      let teamBName = '';

      if (format === 'Double') {
        teamAName = `${courtPlayers[0]} & ${courtPlayers[1]}`;
        teamBName = `${courtPlayers[2]} & ${courtPlayers[3]}`;
      } else {
        teamAName = courtPlayers[0];
        teamBName = courtPlayers[1];
      }

      newMatches.push({
        id: Date.now() + court,
        match_number: startingMatchNum + court,
        court_number: court + 1,
        team_a_name: teamAName,
        team_b_name: teamBName,
        score_a: 0,
        score_b: 0,
        status: 'in_progress',
        format: format,
        courtPlayers: courtPlayers,
      });
    }

    return { newMatches, updatedPlayCounts: newPlayCounts };
  };

  // ─── MULAI SESI ─────────────────────────────────────────────────────────────
  const handleStartSession = () => {
    setSetupError('');

    const parsedPlayers = playerInput
      .split('\n')
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    const playersPerCourt = gameFormat === 'Double' ? 4 : 2;
    const minNeeded = playersPerCourt;
    const idealNeeded = numCourts * playersPerCourt;

    if (parsedPlayers.length < minNeeded) {
      setSetupError(
        `Minimal ${minNeeded} pemain diperlukan untuk format ${gameFormat === 'Double' ? 'Ganda (Double)' : 'Tunggal (Single)'}.`
      );
      return;
    }

    if (parsedPlayers.length < idealNeeded) {
      setSetupError(
        `Membutuhkan minimal ${idealNeeded} pemain untuk ${numCourts} lapangan format ${
          gameFormat === 'Double' ? 'Ganda' : 'Tunggal'
        }. Saat ini baru ada ${parsedPlayers.length} nama.`
      );
      return;
    }

    const initialPlayCounts = {};
    parsedPlayers.forEach((p) => {
      initialPlayCounts[p] = 0;
    });

    const { newMatches, updatedPlayCounts } = generateRoundMatches(
      parsedPlayers,
      initialPlayCounts,
      1,
      numCourts,
      gameFormat
    );

    setAllSessionPlayers(parsedPlayers);
    setPlayerPlayCounts(updatedPlayCounts);
    setMatches(newMatches);
    setMatchCounter(newMatches.length);
    setSessionStartTime(Date.now());
    setElapsedSeconds(0);
    setIsSessionActive(true);
  };

  const handleAddNextRound = () => {
    const { newMatches, updatedPlayCounts } = generateRoundMatches(
      allSessionPlayers,
      playerPlayCounts,
      matchCounter + 1,
      numCourts,
      gameFormat
    );

    setPlayerPlayCounts(updatedPlayCounts);
    setMatches((prev) => [...prev, ...newMatches]);
    setMatchCounter((prev) => prev + newMatches.length);
  };

  const updateScore = (matchId, team, delta) => {
    setMatches((prevMatches) =>
      prevMatches.map((m) => {
        if (m.id !== matchId) return m;

        if (team === 'A') {
          return { ...m, score_a: Math.max(0, m.score_a + delta) };
        } else {
          return { ...m, score_b: Math.max(0, m.score_b + delta) };
        }
      })
    );

    if (activeModalMatch && activeModalMatch.id === matchId) {
      setActiveModalMatch((prev) => {
        if (!prev) return null;
        if (team === 'A') {
          return { ...prev, score_a: Math.max(0, prev.score_a + delta) };
        } else {
          return { ...prev, score_b: Math.max(0, prev.score_b + delta) };
        }
      });
    }
  };

  const toggleMatchStatus = (matchId) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId) return m;
        const newStatus = m.status === 'finished' ? 'in_progress' : 'finished';
        return { ...m, status: newStatus };
      })
    );

    if (activeModalMatch && activeModalMatch.id === matchId) {
      setActiveModalMatch((prev) =>
        prev ? { ...prev, status: prev.status === 'finished' ? 'in_progress' : 'finished' } : null
      );
    }
  };

  const handleConfirmEndSession = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    const payload = {
      sport_type: 'Badminton',
      session_name: sessionName || 'Sesi Mabar Badminton',
      game_format: gameFormat,
      court_count: Number(numCourts),
      total_players: allSessionPlayers.length,
      players: allSessionPlayers,
      duration_seconds: elapsedSeconds,
      matches: matches.map((m, idx) => ({
        match_number: idx + 1,
        court_number: m.court_number,
        team_a_name: m.team_a_name,
        team_b_name: m.team_b_name,
        score_a: m.score_a,
        score_b: m.score_b,
        status: m.status || 'finished',
      })),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal menyimpan sesi');
      }

      setIsSessionActive(false);
      setShowEndModal(false);
      navigate('/history');
    } catch (err) {
      console.error('Error saving session:', err);
      setSubmitError(err.message || 'Terjadi kesalahan saat menyimpan sesi');
      setIsSubmitting(false);
    }
  };

  const handleAbortSession = () => {
    if (window.confirm('Batalkan sesi ini? Pertandingan yang belum disimpan akan dihapus.')) {
      setIsSessionActive(false);
      setMatches([]);
      setMatchCounter(0);
      setElapsedSeconds(0);
    }
  };

  const activePlayingPlayers = new Set();
  matches
    .filter((m) => m.status === 'in_progress')
    .forEach((m) => {
      (m.courtPlayers || []).forEach((p) => activePlayingPlayers.add(p));
    });

  const restingPlayers = allSessionPlayers.filter((p) => !activePlayingPlayers.has(p));
  const finishedMatchesCount = matches.filter((m) => m.status === 'finished').length;

  return (
    <div className="min-h-screen pb-16">
      {/* ─── TAMPILAN 1: FORM SETUP MATCH MAKING SKETCH ─── */}
      {!isSessionActive ? (
        <div>
          {/* Header Sketch */}
          <div className="bg-[#FAF6EE] border-b-2 border-[#111827] shadow-[0_2px_0px_rgba(17,24,39,0.05)] px-4 pt-10 pb-5 md:pt-6">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1DAD97] text-white border-2 border-[#111827] shadow-[2px_2px_0px_#111827] rounded-xl flex items-center justify-center shrink-0">
                <MatchMakingIcon className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-sketch text-[#111827] tracking-wide">
                  Match Making Badminton
                </h1>
                <p className="text-xs font-mono font-semibold text-slate-600">
                  Rotasi lapangan adil & pencatatan skor sesi terpadu
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="card space-y-5 bg-white">
              {setupError && (
                <div className="p-3 bg-red-50 border-2 border-red-300 text-red-800 text-xs font-bold rounded-xl">
                  {setupError}
                </div>
              )}

              {/* Nama Sesi */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Nama Sesi Pertandingan
                </label>
                <input
                  type="text"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  placeholder="cth: Latihan Rutin Badminton Komputer"
                  className="input-field font-semibold"
                />
              </div>

              {/* Format Game */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Format Pertandingan
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGameFormat('Double')}
                    className={`py-3 px-4 rounded-xl border-2 border-[#111827] text-sm font-bold flex flex-col items-center gap-0.5 transition-all ${
                      gameFormat === 'Double'
                        ? 'bg-[#1DAD97] text-white shadow-[3px_3px_0px_#111827] translate-x-[1px] translate-y-[1px]'
                        : 'bg-white text-slate-700 shadow-[2px_2px_0px_#111827] hover:bg-[#F4EDE0]'
                    }`}
                  >
                    <span className="font-sketch text-lg">Ganda (Double)</span>
                    <span className={`text-[11px] font-mono ${gameFormat === 'Double' ? 'text-white/80' : 'text-slate-500'}`}>
                      4 pemain / lapangan
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGameFormat('Single')}
                    className={`py-3 px-4 rounded-xl border-2 border-[#111827] text-sm font-bold flex flex-col items-center gap-0.5 transition-all ${
                      gameFormat === 'Single'
                        ? 'bg-[#1DAD97] text-white shadow-[3px_3px_0px_#111827] translate-x-[1px] translate-y-[1px]'
                        : 'bg-white text-slate-700 shadow-[2px_2px_0px_#111827] hover:bg-[#F4EDE0]'
                    }`}
                  >
                    <span className="font-sketch text-lg">Tunggal (Single)</span>
                    <span className={`text-[11px] font-mono ${gameFormat === 'Single' ? 'text-white/80' : 'text-slate-500'}`}>
                      2 pemain / lapangan
                    </span>
                  </button>
                </div>
              </div>

              {/* Jumlah Lapangan */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Jumlah Lapangan Tersedia
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={numCourts}
                    onChange={(e) => setNumCourts(Math.max(1, parseInt(e.target.value) || 1))}
                    className="input-field w-24 text-center font-mono font-black text-lg"
                  />
                  <span className="text-xs text-slate-600 font-medium">
                    Kapasitas minimum: <strong className="text-[#111827]">{numCourts * (gameFormat === 'Double' ? 4 : 2)} pemain</strong>
                  </span>
                </div>
              </div>

              {/* Daftar Pemain */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                    Daftar Nama Pemain <span className="text-[10px] lowercase font-normal text-slate-500">(1 baris per pemain)</span>
                  </label>
                  <span className="text-xs font-mono font-bold bg-[#F4EDE0] border border-[#111827] px-2 py-0.2 rounded-full shadow-[1px_1px_0px_#111827]">
                    {playerInput.split('\n').filter((n) => n.trim().length > 0).length} Terdata
                  </span>
                </div>

                <textarea
                  rows="6"
                  value={playerInput}
                  onChange={(e) => setPlayerInput(e.target.value)}
                  placeholder={`Fajar Alfian\nM. Rian Ardianto\nKevin Sanjaya\nMarcus Gideon\nHendra Setiawan\nMohammad Ahsan`}
                  className="input-field font-mono text-xs resize-none"
                />

                {/* Tombol Isi Cepat */}
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-500">Pilihan Cepat:</span>
                  <button
                    type="button"
                    onClick={() => handleUseSample(SAMPLE_PLAYERS_8)}
                    className="text-xs px-3 py-1 bg-white border border-[#111827] hover:bg-[#F4EDE0] text-slate-800 font-bold rounded-full shadow-[1px_1px_0px_#111827] transition-all"
                  >
                    + 8 Pemain
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUseSample(SAMPLE_PLAYERS_4)}
                    className="text-xs px-3 py-1 bg-white border border-[#111827] hover:bg-[#F4EDE0] text-slate-800 font-bold rounded-full shadow-[1px_1px_0px_#111827] transition-all"
                  >
                    + 4 Pemain
                  </button>
                  {playerInput && (
                    <button
                      type="button"
                      onClick={() => setPlayerInput('')}
                      className="text-xs px-2.5 py-1 text-rose-700 hover:bg-rose-50 font-bold rounded-lg ml-auto"
                    >
                      Kosongkan
                    </button>
                  )}
                </div>
              </div>

              {/* Tombol Mulai Sesi */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartSession}
                  className="w-full btn-primary py-3.5 text-base font-bold shadow-[4px_4px_0px_#111827]"
                >
                  <ShuttlecockIcon className="w-4 h-4" />
                  <span className="font-sketch text-lg">Mulai Sesi & Susun Pertandingan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ─── TAMPILAN 2: SESI AKTIF SKETCH ─── */
        <div>
          {/* Header Sticky Sesi Aktif */}
          <div className="sticky top-0 z-40 bg-[#FAF6EE]/95 backdrop-blur-sm border-b-2 border-[#111827] px-4 py-3 shadow-[0_2px_0px_rgba(17,24,39,0.06)]">
            <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DAD97] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1DAD97]"></span>
                </span>
                <div>
                  <h2 className="text-sm font-bold font-sketch text-[#111827] truncate max-w-[150px] sm:max-w-xs text-base">
                    {sessionName}
                  </h2>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600">
                    <span className="text-[#0F766E] bg-[#E8F7F5] border border-[#111827] px-2 py-0.2 rounded shadow-[1px_1px_0px_#111827]">
                      {formatTimer(elapsedSeconds)}
                    </span>
                    <span>• {numCourts} Lapangan</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAbortSession}
                  className="px-2.5 py-1 text-xs text-slate-600 hover:text-rose-700 font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() => setShowEndModal(true)}
                  className="btn-danger py-1.5 px-3.5 text-xs font-bold shadow-[2px_2px_0px_#111827]"
                >
                  <CheckIcon className="w-3.5 h-3.5" />
                  <span>Akhiri Sesi</span>
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 py-5 space-y-4">
            {/* Status Sesi & Kemajuan */}
            <div className="card p-3.5 bg-white">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-[#F4EDE0] border border-[#111827] rounded-xl shadow-[1px_1px_0px_#111827]">
                  <span className="text-[10px] text-slate-600 block uppercase font-bold">Pemain</span>
                  <span className="font-black font-mono text-slate-900">{allSessionPlayers.length} Orang</span>
                </div>
                <div className="p-2.5 bg-[#F4EDE0] border border-[#111827] rounded-xl shadow-[1px_1px_0px_#111827]">
                  <span className="text-[10px] text-slate-600 block uppercase font-bold">Format</span>
                  <span className="font-bold text-[#1DAD97]">
                    {gameFormat === 'Double' ? 'Ganda (2v2)' : 'Tunggal (1v1)'}
                  </span>
                </div>
                <div className="p-2.5 bg-[#F4EDE0] border border-[#111827] rounded-xl shadow-[1px_1px_0px_#111827]">
                  <span className="text-[10px] text-slate-600 block uppercase font-bold">Progres</span>
                  <span className="font-black font-mono text-[#16A34A]">
                    {finishedMatchesCount}/{matches.length} Selesai
                  </span>
                </div>
              </div>
            </div>

            {/* Pemain Istirahat / Menunggu Giliran (Bench) */}
            {restingPlayers.length > 0 && (
              <div className="bg-[#FEF3C7] border-2 border-[#111827] rounded-2xl p-4 shadow-[3px_3px_0px_#111827]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-[#92400E] flex items-center gap-1.5 uppercase tracking-wider">
                    <ClockIcon className="w-3.5 h-3.5 text-[#92400E]" />
                    <span>Menunggu Giliran ({restingPlayers.length} Pemain)</span>
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-[#92400E]">
                    Prioritas rotasi berikutnya
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {restingPlayers.map((player, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 bg-white border border-[#111827] text-[#92400E] text-xs rounded-full font-bold flex items-center gap-1.5 shadow-[1px_1px_0px_#111827]"
                    >
                      <span>{player}</span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {playerPlayCounts[player] || 0}x
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Header Daftar Pertandingan */}
            <div className="flex items-center justify-between pt-1">
              <h2 className="text-xl font-bold font-sketch text-[#111827]">
                Daftar Pertandingan Sesi ({matches.length})
              </h2>

              <button
                onClick={handleAddNextRound}
                className="btn-secondary py-1.5 px-3.5 text-xs font-bold shadow-[2px_2px_0px_#111827]"
              >
                <PlusIcon className="w-3.5 h-3.5 text-slate-800" />
                <span>Tambah Babak / Rotasi</span>
              </button>
            </div>

            {/* Kartu Pertandingan Sesi */}
            <div className="space-y-3.5">
              {matches.map((match) => {
                const isFinished = match.status === 'finished';
                const teamAWon = isFinished && match.score_a > match.score_b;
                const teamBWon = isFinished && match.score_b > match.score_a;

                return (
                  <div
                    key={match.id}
                    className={`card p-0 overflow-hidden transition-all bg-white ${
                      isFinished ? 'opacity-90' : ''
                    }`}
                  >
                    {/* Header Match */}
                    <div className="bg-[#FAF6EE] border-b-2 border-[#111827] px-4 py-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#0F766E] bg-[#E8F7F5] border border-[#111827] px-2 py-0.5 rounded shadow-[1px_1px_0px_#111827]">
                          Match #{match.match_number}
                        </span>
                        <span className="font-mono text-slate-800 bg-white border border-[#111827] px-2 py-0.5 rounded font-bold">
                          Lapangan {match.court_number}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold border border-[#111827] ${
                            isFinished
                              ? 'bg-[#DCFCE7] text-[#166534]'
                              : 'bg-[#FEF3C7] text-[#92400E] animate-pulse'
                          }`}
                        >
                          {isFinished ? 'Selesai' : 'Sedang Bertanding'}
                        </span>
                        <button
                          onClick={() => setActiveModalMatch(match)}
                          className="text-slate-600 hover:text-[#1DAD97] p-1 font-bold"
                          title="Tampilan Penuh"
                        >
                          <ExpandIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Scoreboard Interaktif Inline */}
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-3 items-center">
                        {/* Tim A */}
                        <div
                          className={`p-3 rounded-2xl border-2 border-[#111827] shadow-[2px_2px_0px_#111827] text-center transition-all overflow-hidden min-w-0 ${
                            teamAWon ? 'bg-[#E8F7F5]' : 'bg-[#FAF6EE]'
                          }`}
                        >
                          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                            Tim A
                          </span>
                          <p className="text-sm font-bold text-[#111827] truncate mt-0.5" title={match.team_a_name}>
                            {match.team_a_name}
                          </p>

                          {/* Angka Skor Tim A */}
                          <div className="my-2">
                            <span className="text-3xl sm:text-4xl font-black font-mono text-[#111827]">
                              {match.score_a}
                            </span>
                          </div>

                          {/* Kontrol Skor Inline */}
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateScore(match.id, 'A', -1)}
                              disabled={match.score_a === 0}
                              className="w-8 h-8 rounded-lg bg-white border-2 border-[#111827] shadow-[1.5px_1.5px_0px_#111827] hover:bg-[#F4EDE0] text-slate-800 font-bold flex items-center justify-center disabled:opacity-30 transition-all active:translate-x-0.5 active:translate-y-0.5"
                            >
                              <MinusIcon className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => updateScore(match.id, 'A', 1)}
                              className="w-12 h-8 rounded-lg bg-[#1DAD97] hover:bg-[#148B79] text-white font-black text-xs border-2 border-[#111827] shadow-[2px_2px_0px_#111827] flex items-center justify-center transition-all active:translate-x-0.5 active:translate-y-0.5"
                            >
                              +1
                            </button>
                          </div>
                        </div>

                        {/* Tim B */}
                        <div
                          className={`p-3 rounded-2xl border-2 border-[#111827] shadow-[2px_2px_0px_#111827] text-center transition-all overflow-hidden min-w-0 ${
                            teamBWon ? 'bg-[#E8F7F5]' : 'bg-[#FAF6EE]'
                          }`}
                        >
                          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                            Tim B
                          </span>
                          <p className="text-sm font-bold text-[#111827] truncate mt-0.5" title={match.team_b_name}>
                            {match.team_b_name}
                          </p>

                          {/* Angka Skor Tim B */}
                          <div className="my-2">
                            <span className="text-3xl sm:text-4xl font-black font-mono text-[#111827]">
                              {match.score_b}
                            </span>
                          </div>

                          {/* Kontrol Skor Inline */}
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateScore(match.id, 'B', -1)}
                              disabled={match.score_b === 0}
                              className="w-8 h-8 rounded-lg bg-white border-2 border-[#111827] shadow-[1.5px_1.5px_0px_#111827] hover:bg-[#F4EDE0] text-slate-800 font-bold flex items-center justify-center disabled:opacity-30 transition-all active:translate-x-0.5 active:translate-y-0.5"
                            >
                              <MinusIcon className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => updateScore(match.id, 'B', 1)}
                              className="w-12 h-8 rounded-lg bg-[#1DAD97] hover:bg-[#148B79] text-white font-black text-xs border-2 border-[#111827] shadow-[2px_2px_0px_#111827] flex items-center justify-center transition-all active:translate-x-0.5 active:translate-y-0.5"
                            >
                              +1
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Bar Aksi Bawah */}
                      <div className="mt-3.5 pt-3 border-t-2 border-dashed border-[#F4EDE0] flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setActiveModalMatch(match)}
                          className="text-xs font-bold text-[#1DAD97] hover:underline flex items-center gap-1"
                        >
                          <ExpandIcon className="w-3.5 h-3.5" />
                          <span>Papan Skor Penuh</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleMatchStatus(match.id)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold border-2 border-[#111827] shadow-[2px_2px_0px_#111827] transition-all active:translate-x-0.5 active:translate-y-0.5 ${
                            isFinished
                              ? 'bg-white text-slate-700 hover:bg-[#F4EDE0]'
                              : 'bg-[#16A34A] text-white hover:bg-[#15803D]'
                          }`}
                        >
                          {isFinished ? 'Ubah Skor' : 'Tandai Selesai'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tombol Akhiri Sesi Bawah */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setShowEndModal(true)}
                className="w-full btn-danger py-3.5 text-base font-bold shadow-[4px_4px_0px_#111827]"
              >
                <CheckIcon className="w-4 h-4" />
                <span className="font-sketch text-lg">Akhiri Sesi & Simpan ke Riwayat</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL SCOREBOARD BESAR SKETCH ─── */}
      {activeModalMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border-3 border-[#111827] shadow-[6px_6px_0px_#111827] w-full max-w-lg p-6 text-center space-y-6 animate-scale-up">
            <div className="flex items-center justify-between border-b-2 border-[#111827] pb-3">
              <div className="text-left">
                <span className="text-xs font-mono font-bold text-[#0F766E] bg-[#E8F7F5] border border-[#111827] px-2.5 py-0.5 rounded-full shadow-[1px_1px_0px_#111827]">
                  Match #{activeModalMatch.match_number} • Lapangan {activeModalMatch.court_number}
                </span>
                <h3 className="text-base font-bold font-sketch text-[#111827] mt-1">Papan Skor Pertandingan</h3>
              </div>
              <button
                onClick={() => setActiveModalMatch(null)}
                className="w-8 h-8 rounded-xl bg-white hover:bg-[#F4EDE0] text-[#111827] border-2 border-[#111827] shadow-[2px_2px_0px_#111827] flex items-center justify-center transition-all"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Papan Skor Besar */}
            <div className="grid grid-cols-2 gap-4">
              {/* Tim A */}
              <div className="bg-[#FAF6EE] border-2 border-[#111827] shadow-[3px_3px_0px_#111827] rounded-2xl p-4 flex flex-col justify-between overflow-hidden min-w-0">
                <div className="overflow-hidden max-w-full">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Tim A</span>
                  <p className="font-bold text-base text-[#111827] mt-1 truncate" title={activeModalMatch.team_a_name}>
                    {activeModalMatch.team_a_name}
                  </p>
                </div>
                <div className="my-6">
                  <span className="text-6xl sm:text-7xl font-black font-mono text-[#111827]">
                    {activeModalMatch.score_a}
                  </span>
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => updateScore(activeModalMatch.id, 'A', -1)}
                    disabled={activeModalMatch.score_a === 0}
                    className="w-11 h-11 rounded-xl bg-white border-2 border-[#111827] shadow-[2px_2px_0px_#111827] font-bold text-base flex items-center justify-center disabled:opacity-30"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateScore(activeModalMatch.id, 'A', 1)}
                    className="flex-1 h-11 rounded-xl bg-[#1DAD97] hover:bg-[#148B79] text-white font-black text-base border-2 border-[#111827] shadow-[2px_2px_0px_#111827] flex items-center justify-center"
                  >
                    +1
                  </button>
                </div>
              </div>

              {/* Tim B */}
              <div className="bg-[#FAF6EE] border-2 border-[#111827] shadow-[3px_3px_0px_#111827] rounded-2xl p-4 flex flex-col justify-between overflow-hidden min-w-0">
                <div className="overflow-hidden max-w-full">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Tim B</span>
                  <p className="font-bold text-base text-[#111827] mt-1 truncate" title={activeModalMatch.team_b_name}>
                    {activeModalMatch.team_b_name}
                  </p>
                </div>
                <div className="my-6">
                  <span className="text-6xl sm:text-7xl font-black font-mono text-[#111827]">
                    {activeModalMatch.score_b}
                  </span>
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => updateScore(activeModalMatch.id, 'B', -1)}
                    disabled={activeModalMatch.score_b === 0}
                    className="w-11 h-11 rounded-xl bg-white border-2 border-[#111827] shadow-[2px_2px_0px_#111827] font-bold text-base flex items-center justify-center disabled:opacity-30"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateScore(activeModalMatch.id, 'B', 1)}
                    className="flex-1 h-11 rounded-xl bg-[#1DAD97] hover:bg-[#148B79] text-white font-black text-base border-2 border-[#111827] shadow-[2px_2px_0px_#111827] flex items-center justify-center"
                  >
                    +1
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => toggleMatchStatus(activeModalMatch.id)}
                className={`flex-1 py-3 rounded-full font-bold text-xs border-2 border-[#111827] shadow-[2px_2px_0px_#111827] ${
                  activeModalMatch.status === 'finished'
                    ? 'bg-white text-slate-700'
                    : 'bg-[#16A34A] text-white'
                }`}
              >
                {activeModalMatch.status === 'finished' ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
              </button>
              <button
                onClick={() => setActiveModalMatch(null)}
                className="btn-secondary py-3 px-6 text-xs font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL KONFIRMASI AKHIRI SESI ─── */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border-3 border-[#111827] shadow-[6px_6px_0px_#111827] w-full max-w-md p-6 text-center space-y-4 animate-scale-up">
            <div>
              <h3 className="text-xl font-bold font-sketch text-[#111827]">Akhiri Sesi Pertandingan?</h3>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Seluruh data pertandingan sesi ini akan dikirim dan disimpan ke Riwayat Sesi.
              </p>
            </div>

            {submitError && (
              <div className="p-3 bg-red-50 border-2 border-red-300 text-red-800 text-xs font-bold rounded-xl text-left">
                {submitError}
              </div>
            )}

            {/* Ringkasan Sesi */}
            <div className="bg-[#FAF6EE] border-2 border-[#111827] shadow-[2px_2px_0px_#111827] rounded-2xl p-4 text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500 uppercase font-bold">Nama Sesi:</span>
                <span className="font-bold text-[#111827]">{sessionName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 uppercase font-bold">Durasi:</span>
                <span className="font-bold text-[#16A34A]">{formatTimer(elapsedSeconds)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 uppercase font-bold">Total Pemain:</span>
                <span className="font-bold text-[#111827]">{allSessionPlayers.length} Orang</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 uppercase font-bold">Total Match:</span>
                <span className="font-bold text-[#0F766E]">{matches.length} Pertandingan</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowEndModal(false)}
                disabled={isSubmitting}
                className="btn-secondary py-2.5 text-xs font-bold"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={handleConfirmEndSession}
                disabled={isSubmitting}
                className="btn-danger py-2.5 text-xs font-bold shadow-[2px_2px_0px_#111827]"
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan & Selesai'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchMakingPage;
