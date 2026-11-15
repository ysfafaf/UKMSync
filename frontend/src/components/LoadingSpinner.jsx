// Komponen loading spinner - Sketch Design System
import React from 'react';

function LoadingSpinner({ message = 'Memuat data...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      {/* Spinner Animasi Sketch */}
      <div className="w-9 h-9 border-3 border-[#10240f]/15 border-t-[#418a3b] rounded-full animate-spin" />
      {/* Pesan loading */}
      <p className="text-slate-600 text-xs font-mono font-bold tracking-tight">{message}</p>
    </div>
  );
}

export default LoadingSpinner;
