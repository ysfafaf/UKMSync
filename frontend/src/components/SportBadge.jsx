// Komponen badge untuk jenis olahraga - Sketch Design System
import React from 'react';
import {
  ShuttlecockIcon,
  BasketballIcon,
  VolleyballIcon,
  SoccerIcon,
  TrophyIcon,
} from './Icons.jsx';

const SPORT_CONFIG = {
  Badminton: {
    badgeClass: 'bg-[#E8F7F5] text-[#0F766E] border-[#111827]',
    icon: ShuttlecockIcon,
  },
  Basket: {
    badgeClass: 'bg-[#FEF3C7] text-[#92400E] border-[#111827]',
    icon: BasketballIcon,
  },
  Voli: {
    badgeClass: 'bg-[#DCFCE7] text-[#166534] border-[#111827]',
    icon: VolleyballIcon,
  },
  Futsal: {
    badgeClass: 'bg-[#F3E8FF] text-[#6B21A8] border-[#111827]',
    icon: SoccerIcon,
  },
};

function SportBadge({ sport, className = '', showIcon = true }) {
  const config = SPORT_CONFIG[sport] || {
    badgeClass: 'bg-[#F4EDE0] text-slate-800 border-[#111827]',
    icon: TrophyIcon,
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border-1.5 shadow-[1.5px_1.5px_0px_#111827] shrink-0 ${config.badgeClass} ${className}`}
    >
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      <span>{sport}</span>
    </span>
  );
}

export default SportBadge;
