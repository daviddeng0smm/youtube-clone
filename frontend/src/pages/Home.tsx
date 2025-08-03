import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import { Game } from '../types';
import { gamesApi } from '../services/api';

const Home: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');

  useEffect(() => {
    fetchGames();
  }, [selectedPlatform]);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await gamesApi.getAll(selectedPlatform || undefined);
      setGames(response.games);
    } catch (error: any) {
      setError('Failed to load games');
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeemSuccess = () => {
    // Refresh games to update available codes count
    fetchGames();
  };

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform);
  };

  if (loading) {
    return (
      <div style={loadingContainerStyles}>
        <div style={loadingSpinnerStyles}></div>
        <p>Loading games...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={errorContainerStyles}>
        <p style={errorTextStyles}>{error}</p>
        <button onClick={fetchGames} style={retryButtonStyles}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      <div style={heroSectionStyles}>
        <h1 style={heroTitleStyles}>Discover Amazing Sony Games</h1>
        <p style={heroSubtitleStyles}>
          Redeem exclusive game codes for your favorite PlayStation and Steam titles
        </p>
      </div>

      <div style={filtersStyles}>
        <h3 style={filterTitleStyles}>Filter by Platform:</h3>
        <div style={filterButtonsStyles}>
          <button
            onClick={() => handlePlatformChange('')}
            style={{
              ...filterButtonStyles,
              ...(selectedPlatform === '' ? activeFilterButtonStyles : {}),
            }}
          >
            All Games
          </button>
          <button
            onClick={() => handlePlatformChange('playstation')}
            style={{
              ...filterButtonStyles,
              ...(selectedPlatform === 'playstation' ? activeFilterButtonStyles : {}),
            }}
          >
            PlayStation
          </button>
          <button
            onClick={() => handlePlatformChange('steam')}
            style={{
              ...filterButtonStyles,
              ...(selectedPlatform === 'steam' ? activeFilterButtonStyles : {}),
            }}
          >
            Steam
          </button>
        </div>
      </div>

      {games.length === 0 ? (
        <div style={noGamesStyles}>
          <p>No games found for the selected platform.</p>
        </div>
      ) : (
        <div style={gamesGridStyles}>
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onRedeemSuccess={handleRedeemSuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const containerStyles: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem',
};

const heroSectionStyles: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '3rem',
  padding: '2rem',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const heroTitleStyles: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '1rem',
};

const heroSubtitleStyles: React.CSSProperties = {
  fontSize: '1.2rem',
  color: '#666',
  maxWidth: '600px',
  margin: '0 auto',
};

const filtersStyles: React.CSSProperties = {
  marginBottom: '2rem',
  textAlign: 'center',
};

const filterTitleStyles: React.CSSProperties = {
  fontSize: '1.2rem',
  color: '#333',
  marginBottom: '1rem',
};

const filterButtonsStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  flexWrap: 'wrap',
};

const filterButtonStyles: React.CSSProperties = {
  padding: '0.5rem 1rem',
  border: '2px solid #007bff',
  backgroundColor: 'transparent',
  color: '#007bff',
  borderRadius: '6px',
  fontSize: '1rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s',
};

const activeFilterButtonStyles: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: 'white',
};

const gamesGridStyles: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '2rem',
  padding: '1rem 0',
};

const loadingContainerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '50vh',
  color: '#666',
};

const loadingSpinnerStyles: React.CSSProperties = {
  width: '40px',
  height: '40px',
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #007bff',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginBottom: '1rem',
};

const errorContainerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '50vh',
};

const errorTextStyles: React.CSSProperties = {
  color: '#dc3545',
  fontSize: '1.2rem',
  marginBottom: '1rem',
};

const retryButtonStyles: React.CSSProperties = {
  padding: '0.5rem 1rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer',
};

const noGamesStyles: React.CSSProperties = {
  textAlign: 'center',
  color: '#666',
  fontSize: '1.2rem',
  padding: '2rem',
};

export default Home;