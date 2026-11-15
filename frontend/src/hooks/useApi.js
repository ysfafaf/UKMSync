// Custom hook untuk fetch data dari API
// Penggunaan: const { data, loading, error, refetch } = useApi(url)
import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api.js';

function useApi(url) {
  // State untuk data, loading, dan error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi fetch yang bisa dipanggil ulang
  const fetchData = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
      const response = await fetch(fullUrl);

      // Handle response yang tidak OK
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      // Tangani error jaringan atau parsing
      setError(err.message || 'Terjadi kesalahan saat mengambil data');
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Fetch otomatis saat URL berubah
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export default useApi;
