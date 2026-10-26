import { useEffect, useState } from 'react';

const PHOTOS_URL = 'https://picsum.photos/v2/list?limit=30';

export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPhotos() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(PHOTOS_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Unable to load photos (${response.status}).`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('The photo service returned an unexpected response.');
        }

        setPhotos(data);
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load photos. Please try again.');
          setPhotos([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => controller.abort();
  }, []);

  return { photos, loading, error };
}
