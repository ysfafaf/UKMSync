// Konfigurasi URL API backend
// Gunakan variabel environment VITE_API_URL jika tersedia, fallback ke localhost
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
