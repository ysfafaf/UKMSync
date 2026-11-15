// Komponen kartu UKM - Sketch Design System (Forest Green Edition)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarIcon,
  CategorySportIcon,
  CategoryTechIcon,
  CategoryArtIcon,
  CategoryGameIcon,
  UsersIcon,
  ArrowRightIcon,
} from './Icons.jsx';

const CATEGORY_ICONS = {
  Olahraga: CategorySportIcon,
  Teknologi: CategoryTechIcon,
  'Seni & Budaya': CategoryArtIcon,
  Hiburan: CategoryGameIcon,
  Komunitas: UsersIcon,
};

const CATEGORY_COLORS = {
  Olahraga: {
    bg: 'bg-[#e6f4e4] text-[#254423]',
    badge: 'bg-[#e6f4e4] text-[#254423] border-[#10240f]',
  },
  Teknologi: {
    bg: 'bg-[#ECFEFF] text-[#0E7490]',
    badge: 'bg-[#ECFEFF] text-[#0E7490] border-[#10240f]',
  },
  'Seni & Budaya': {
    bg: 'bg-[#FFF1F2] text-[#BE123C]',
    badge: 'bg-[#FFF1F2] text-[#BE123C] border-[#10240f]',
  },
  Hiburan: {
    bg: 'bg-[#FEF3C7] text-[#92400E]',
    badge: 'bg-[#FEF3C7] text-[#92400E] border-[#10240f]',
  },
  Komunitas: {
    bg: 'bg-[#FFEDD5] text-[#C2410C]',
    badge: 'bg-[#FFEDD5] text-[#C2410C] border-[#10240f]',
  },
};

function UkmCard({ ukm }) {
  const navigate = useNavigate();
  const { id, name, category, schedule, image_url } = ukm;

  const Icon = CATEGORY_ICONS[category] || CategorySportIcon;
  const colorTheme = CATEGORY_COLORS[category] || CATEGORY_COLORS.Olahraga;

  const handleClick = () => {
    navigate(`/ukm/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="card hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#10240f] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none cursor-pointer transition-all duration-150 flex flex-col justify-between group bg-white overflow-hidden p-3.5 sm:p-4"
    >
      <div>
        {/* Gambar Foto UKM dengan Frame Sketch */}
        <div className="relative w-full h-36 mb-3 rounded-xl border-2 border-[#10240f] overflow-hidden shadow-[2px_2px_0px_#10240f] bg-[#f4faf3] shrink-0">
          <img
            src={image_url || '/images/sample-ukm.jpg'}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/sample-ukm.jpg';
            }}
          />
          {/* Lencana Kategori Overlay */}
          <div className="absolute top-2 left-2">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border-1.5 shadow-[1px_1px_0px_#10240f] backdrop-blur-xs ${colorTheme.badge}`}
            >
              <Icon className="w-3 h-3" />
              <span>{category}</span>
            </span>
          </div>
        </div>

        {/* Nama UKM */}
        <h3 className="font-bold text-[#10240f] text-base leading-snug mb-2 line-clamp-1 group-hover:text-[#418a3b] transition-colors break-words font-sketch tracking-wide text-lg">
          {name}
        </h3>
      </div>

      {/* Footer Info Jadwal */}
      <div className="pt-2.5 mt-1 border-t-2 border-dashed border-[#e6f4e4] flex items-center justify-between text-xs text-slate-600 font-medium gap-2">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <CalendarIcon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate">{schedule}</span>
        </div>

        <ArrowRightIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#418a3b] transition-colors shrink-0 ml-1" />
      </div>
    </div>
  );
}

export default UkmCard;
