import { useState, useCallback } from 'react';
import { detectMood, getSearchTerm } from '../utils/moodEngine';
import { getReelsSongsForMood } from '../data/reelsTrending';

const ITUNES_BASE = 'https://itunes.apple.com/search';
const LIMIT = 20;

async function fetchFromITunes(term, country = 'US', limit = LIMIT) {
  try {
    const res = await fetch(`${ITUNES_BASE}?term=${encodeURIComponent(term)}&media=music&entity=song&limit=${limit}&country=${country}`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).map(track => ({
      id: track.trackId || Math.random(),
      title: track.trackName || 'Unknown',
      artist: track.artistName || 'Unknown',
      album: track.collectionName || '',
      artwork: track.artworkUrl100?.replace('100x100', '400x400'),
    }));
  } catch { return []; }
}

export function useMusic() {
  const [state, setState] = useState({ songs: [], loading: false, error: null, currentMood: null, hasSearched: false });

  const fetchSongs = useCallback(async (input, region = 'indian') => {
    if (!input.trim()) return;
    setState(s => ({ ...s, loading: true, error: null, hasSearched: true }));

    try {
      const mood = detectMood(input);
      let results = [];

      if (region === 'indian') {
        const liveTerm = getSearchTerm(mood, 'indian') || 'trending Hindi';
        results = await fetchFromITunes(liveTerm, 'IN', LIMIT);
      } else {
        const globalTerm = getSearchTerm(mood, 'international') || 'pop music';
        results = await fetchFromITunes(globalTerm, 'US', LIMIT);
      }

      if (results.length === 0) throw new Error('NO VIBES DETECTED.');
      setState({ songs: results, loading: false, error: null, currentMood: mood, hasSearched: true });
    } catch (err) {
      setState(s => ({ ...s, loading: false, error: err.message, songs: [] }));
    }
  }, []);

  return { ...state, fetchSongs };
}
