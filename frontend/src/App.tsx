import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';

const App: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthProvider>
      <div style={appStyles}>
        <Header onAuthClick={handleAuthClick} />
        <main style={mainStyles}>
          <Home />
        </main>
        <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
      </div>
    </AuthProvider>
  );
};

const appStyles: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const mainStyles: React.CSSProperties = {
  flex: 1,
  paddingTop: '2rem',
};

export default App;