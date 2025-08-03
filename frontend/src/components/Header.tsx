import React from 'react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header style={headerStyles}>
      <div style={containerStyles}>
        <div style={logoStyles}>
          <h1 style={logoTextStyles}>🎮 Game Code Dispenser</h1>
          <p style={subtitleStyles}>Sony Published Games</p>
        </div>
        
        <div style={authSectionStyles}>
          {user ? (
            <div style={userInfoStyles}>
              <span style={welcomeTextStyles}>Welcome, {user.name}!</span>
              <button onClick={handleLogout} style={logoutButtonStyles}>
                Logout
              </button>
            </div>
          ) : (
            <button onClick={onAuthClick} style={loginButtonStyles}>
              Login / Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

const headerStyles: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  padding: '1rem 0',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const containerStyles: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const logoTextStyles: React.CSSProperties = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#333',
  margin: 0,
};

const subtitleStyles: React.CSSProperties = {
  fontSize: '0.9rem',
  color: '#666',
  margin: 0,
  fontWeight: '500',
};

const authSectionStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const userInfoStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const welcomeTextStyles: React.CSSProperties = {
  color: '#333',
  fontSize: '1rem',
  fontWeight: '500',
};

const loginButtonStyles: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  fontSize: '1rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};

const logoutButtonStyles: React.CSSProperties = {
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  fontSize: '0.9rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};

export default Header;