import React, { useState } from 'react';
import { Game } from '../types';
import { gamesApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface GameCardProps {
  game: Game;
  onRedeemSuccess?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onRedeemSuccess }) => {
  const { user } = useAuth();
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemMessage, setRedeemMessage] = useState('');

  const handleRedeem = async () => {
    if (!user) {
      setRedeemMessage('Please login to redeem codes');
      return;
    }

    if (game.available_codes === 0) {
      setRedeemMessage('No codes available for this game');
      return;
    }

    setIsRedeeming(true);
    try {
      const response = await gamesApi.redeemCode(game.id);
      setRedeemMessage(`Code redeemed successfully: ${response.code}`);
      if (onRedeemSuccess) {
        onRedeemSuccess();
      }
    } catch (error: any) {
      setRedeemMessage(error.response?.data?.error || 'Failed to redeem code');
    } finally {
      setIsRedeeming(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div style={cardStyles}>
      <div style={imageContainerStyles}>
        <img
          src={game.img_url || '/placeholder-game.jpg'}
          alt={game.name}
          style={imageStyles}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400/333/fff?text=Game+Image';
          }}
        />
        <div style={platformBadgeStyles}>
          {game.platform.toUpperCase()}
        </div>
      </div>
      
      <div style={contentStyles}>
        <h3 style={titleStyles}>{game.name}</h3>
        <p style={genreStyles}>{game.genre}</p>
        <p style={dateStyles}>Released: {formatDate(game.release_date)}</p>
        
        <div style={codesInfoStyles}>
          <span style={codesAvailableStyles}>
            {game.available_codes} / {game.total_codes} codes available
          </span>
        </div>

        {user && (
          <button
            onClick={handleRedeem}
            disabled={isRedeeming || game.available_codes === 0}
            style={{
              ...redeemButtonStyles,
              ...(isRedeeming || game.available_codes === 0 ? disabledButtonStyles : {}),
            }}
          >
            {isRedeeming ? 'Redeeming...' : 'Redeem Code'}
          </button>
        )}

        {!user && (
          <p style={loginMessageStyles}>Login to redeem codes</p>
        )}

        {redeemMessage && (
          <p style={messageStyles}>{redeemMessage}</p>
        )}
      </div>
    </div>
  );
};

const cardStyles: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: 'pointer',
  maxWidth: '300px',
  margin: '0 auto',
};

const imageContainerStyles: React.CSSProperties = {
  position: 'relative',
  height: '400px',
  overflow: 'hidden',
};

const imageStyles: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const platformBadgeStyles: React.CSSProperties = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 'bold',
};

const contentStyles: React.CSSProperties = {
  padding: '20px',
};

const titleStyles: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '8px',
  color: '#333',
};

const genreStyles: React.CSSProperties = {
  color: '#666',
  fontSize: '14px',
  marginBottom: '4px',
};

const dateStyles: React.CSSProperties = {
  color: '#888',
  fontSize: '12px',
  marginBottom: '12px',
};

const codesInfoStyles: React.CSSProperties = {
  marginBottom: '16px',
};

const codesAvailableStyles: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#28a745',
};

const redeemButtonStyles: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  marginBottom: '8px',
};

const disabledButtonStyles: React.CSSProperties = {
  backgroundColor: '#6c757d',
  cursor: 'not-allowed',
};

const loginMessageStyles: React.CSSProperties = {
  textAlign: 'center',
  color: '#666',
  fontSize: '14px',
  fontStyle: 'italic',
};

const messageStyles: React.CSSProperties = {
  fontSize: '12px',
  color: '#28a745',
  textAlign: 'center',
  marginTop: '8px',
  padding: '8px',
  backgroundColor: '#f8f9fa',
  borderRadius: '4px',
};

export default GameCard;