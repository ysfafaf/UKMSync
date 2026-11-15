// Komponen badge untuk jenis olahraga - Sketch Design System (Malibu Theme)
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
    badgeClass: 'bg-[#e2eef7] text-[#3a5b93] border-[#233148]',
    icon: ShuttlecockIcon,
  },
  Basket: {
    badgeClass: 'bg-[#FEF3C7] text-[#92400E] border-[#233148]',
    icon: BasketballIcon,
  },
  Voli: {
    badgeClass: 'bg-[#DCFCE7] text-[#166534] border-[#233148]',
    icon: VolleyballIcon,
  },
  Futsal: {
    badgeClass: 'bg-[#F3E8FF] text-[#6B21A8] border-[#233148]',
    icon: SoccerIcon,
  },
};

function SportBadge({ sport, className = '', showIcon = true }) {
  const config = SPORT_CONFIG[sport] || {
    badgeClass: 'bg-[#e2eef7] text-[#233148] border-[#233148]',
    icon: TrophyIcon,
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border-1.5 shadow-[1.5px_1.5px_0px_#233148] shrink-0 ${config.badgeClass} ${className}`}
    >
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      <span>{sport}</span>
    </span>
  );
}

export default SportBadge;
