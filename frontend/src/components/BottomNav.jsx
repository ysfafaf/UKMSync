// Komponen navigasi bawah (Bottom Navigation) & Desktop Sidebar - Sketch Design System (Forest Green Edition)
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  MatchMakingIcon,
  ScoreboardIcon,
  HistoryIcon,
  ProfileIcon,
  WhatsAppIcon,
  ExternalLinkIcon,
} from './Icons.jsx';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: HomeIcon, exact: true },
  { path: '/matchmaking', label: 'Match Making', icon: MatchMakingIcon },
  { path: '/scoreboard', label: 'Scoreboard', icon: ScoreboardIcon },
  { path: '/history', label: 'Riwayat', icon: HistoryIcon },
  { path: '/profile', label: 'Profil', icon: ProfileIcon },
];

function BottomNav() {
  const location = useLocation();

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <>
      {/* Bottom Nav untuk Mobile - Sketch Style */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#f4faf3] border-t-2 border-[#10240f] shadow-[0_-2px_0px_rgba(16,36,15,0.06)] pb-safe">
        <div className="flex items-center justify-around h-16 px-2">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-12 rounded-xl transition-all duration-150 ${
                  active
                    ? 'bg-[#418a3b] text-white border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f] font-bold'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-600'}`} />
                <span className="text-[10px] mt-0.5 tracking-tight">
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Sidebar Nav untuk Desktop (md+) - Sketch Style */}
      <nav className="hidden md:flex fixed top-0 left-0 bottom-0 w-64 z-50 bg-[#f4faf3] border-r-2 border-[#10240f] shadow-[2px_0px_0px_rgba(16,36,15,0.05)] flex-col py-6 px-4">
        {/* Logo Sidebar */}
        <div className="mb-8 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#418a3b] border-2 border-[#10240f] shadow-[3px_3px_0px_#10240f] rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-black font-sketch leading-none">U</span>
            </div>
            <div>
              <h1 className="font-sketch font-bold text-2xl text-[#10240f] leading-none tracking-wide">
                UKMSync
              </h1>
              <p className="text-[11px] font-mono text-slate-600 font-semibold leading-none mt-1">
                Teknik Komputer Undip
              </p>
            </div>
          </div>
        </div>

        {/* Item Navigasi Sidebar */}
        <div className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  active
                    ? 'bg-[#418a3b] text-white border-2 border-[#10240f] shadow-[3px_3px_0px_#10240f] translate-x-[1px]'
                    : 'text-slate-700 hover:bg-[#e6f4e4] hover:text-[#10240f] border-2 border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-700'}`} />
                <span>{item.label}</span>
                {active && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-white border border-[#10240f]"></span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer Sidebar & Tombol WhatsApp */}
        <div className="mt-auto p-3 bg-white border-2 border-dashed border-[#10240f] rounded-xl shadow-[2px_2px_0px_#10240f] text-center space-y-2">
          <div>
            <p className="font-sketch text-base text-[#10240f] font-bold">Unit Kegiatan Mahasiswa</p>
            <p className="text-[10px] font-mono text-slate-500">Teknik Komputer Undip</p>
          </div>
          <a
            href="https://chat.whatsapp.com/IQytd9YroCH4g463f2hLoH"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs py-2 px-3 rounded-full border-2 border-[#10240f] shadow-[2px_2px_0px_#10240f] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>Grup WhatsApp</span>
            <ExternalLinkIcon className="w-3 h-3 opacity-80" />
          </a>
        </div>
      </nav>
    </>
  );
}

export default BottomNav;
