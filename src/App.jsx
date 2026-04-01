import React, { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import { useMusic } from './hooks/useMusic';
import './App.css';

// --- UTILS ---
const quickMoods = [
  { label: 'Happy',     value: 'feeling happy and joyful' },
  { label: 'Sad',       value: 'feeling sad and lonely' },
  { label: 'Chill',     value: 'relaxed and chill vibes' },
  { label: 'Energetic', value: 'pumped up and energetic' },
  { label: 'Romantic',  value: 'feeling romantic and in love' },
  { label: 'Nostalgic', value: 'feeling nostalgic and throwback' },
];

function getYouTubeSearchUrl(title, artist) {
  const query = `${title} ${artist} official music video`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export default function App() {
  const { songs, loading, error, currentMood, hasSearched, fetchSongs } = useMusic();
  const [region, setRegion] = useState('indian');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleSearch = (val) => {
    const term = val || inputValue;
    if (term.trim() && !loading) {
      fetchSongs(term.trim(), region);
    }
  };

  const handleQuick = (mood) => {
    setInputValue(mood.value);
    fetchSongs(mood.value, region);
  };

  const handlePlay = (song) => {
    window.open(getYouTubeSearchUrl(song.title, song.artist), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <h1 className="logo-text">Vibe Tunes</h1>
        </div>
      </header>

      <main className="main-content">
        {/* MOOD INPUT SECTION */}
        <section className="mood-section">
          <div className="region-toggle-wrapper">
            <div className="region-toggle">
              <button
                className={`region-btn ${region === 'indian' ? 'active' : ''}`}
                onClick={() => setRegion('indian')}
              >
                Indian
              </button>
              <button
                className={`region-btn ${region === 'international' ? 'active' : ''}`}
                onClick={() => setRegion('international')}
              >
                International
              </button>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <div className="input-wrapper">
              <input
                ref={inputRef}
                type="text"
                className="mood-input"
                placeholder="Search for a vibe..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={loading}
                autoFocus
              />
              <button type="submit" className="search-btn" disabled={!inputValue.trim() || loading}>
                {loading ? '...' : 'Search'}
              </button>
            </div>
          </form>

          <div className="quick-moods">
            <div className="quick-chips">
              {quickMoods.map((mood) => (
                <button
                  key={mood.label}
                  className="mood-chip"
                  onClick={() => handleQuick(mood)}
                  disabled={loading}
                >
                  {mood.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* RESULTS SECTION */}
        <div className="results-container">
          {loading ? (
            <div className="loading-container">
              <p className="loading-text">RECORDS_SEARCHING...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <div className="error-icon">⚠ ERROR</div>
              <p>{error.toUpperCase()}</p>
            </div>
          ) : hasSearched && songs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">∅ EMPTY</div>
              <p>NO_VIBES_DETECTED</p>
            </div>
          ) : songs.length > 0 ? (
            <section className="results-section">
              <div className="music-grid">
                {songs.map((song, index) => (
                  <div key={song.id} className="music-card" onClick={() => handlePlay(song)}>
                    <div className="card-artwork-wrapper">
                      <img 
                        src={song.artwork || 'https://placehold.co/400x400/282828/ffffff?text=♫'} 
                        alt={song.title} 
                        className="card-artwork"
                        loading="lazy"
                      />
                      <div className="play-button-overlay">
                        <Play size={24} fill="currentColor" />
                      </div>
                    </div>
                    <div className="card-info">
                      <h3 className="song-title">{song.title}</h3>
                      <p className="song-artist">{song.artist}</p>
                      {song.album && <p className="song-album">{song.album}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <div className="landing-hint">
              <p>Welcome to Vibe Tunes / A dream that never dies</p>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>Vibe Tunes // Made by Viper(A dream that never dies)</p>
      </footer>
    </div>
  );
}
