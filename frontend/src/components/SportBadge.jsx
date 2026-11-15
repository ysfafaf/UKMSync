// Komponen badge untuk jenis olahraga - Sketch Design System (Matcha Olive & Spiced Yuzu Edition)
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
    badgeClass: 'bg-[#E9EEE4] text-[#274221] border-[#192118]',
    icon: ShuttlecockIcon,
  },
  Basket: {
    badgeClass: 'bg-[#FEF3C7] text-[#78350F] border-[#192118]',
    icon: BasketballIcon,
  },
  Voli: {
    badgeClass: 'bg-[#D6E0CF] text-[#274221] border-[#192118]',
    icon: VolleyballIcon,
  },
  Futsal: {
    badgeClass: 'bg-[#F7F8F5] text-[#192118] border-[#192118]',
    icon: SoccerIcon,
  },
};

function SportBadge({ sport, className = '', showIcon = true }) {
  const config = SPORT_CONFIG[sport] || {
    badgeClass: 'bg-[#E9EEE4] text-[#192118] border-[#192118]',
    icon: TrophyIcon,
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border-1.5 shadow-[1.5px_1.5px_0px_#192118] shrink-0 ${config.badgeClass} ${className}`}
    >
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      <span>{sport}</span>
    </span>
  );
}

export default SportBadge;
