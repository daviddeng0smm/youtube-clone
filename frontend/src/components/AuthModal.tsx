import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      onClose();
      setFormData({ name: '', email: '', password: '' });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ name: '', email: '', password: '' });
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyles} onClick={onClose}>
      <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyles}>
          <h2 style={titleStyles}>
            {isLogin ? 'Login' : 'Register'}
          </h2>
          <button onClick={onClose} style={closeButtonStyles}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={formStyles}>
          {!isLogin && (
            <div style={inputGroupStyles}>
              <label style={labelStyles}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={inputStyles}
                placeholder="Enter your name"
              />
            </div>
          )}

          <div style={inputGroupStyles}>
            <label style={labelStyles}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={inputStyles}
              placeholder="Enter your email"
            />
          </div>

          <div style={inputGroupStyles}>
            <label style={labelStyles}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={inputStyles}
              placeholder="Enter your password"
            />
          </div>

          {error && <p style={errorStyles}>{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...submitButtonStyles,
              ...(isLoading ? disabledButtonStyles : {}),
            }}
          >
            {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <div style={switchModeStyles}>
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleMode} style={linkButtonStyles}>
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const overlayStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyles: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '0',
  width: '100%',
  maxWidth: '400px',
  margin: '20px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
};

const headerStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px',
  borderBottom: '1px solid #eee',
};

const titleStyles: React.CSSProperties = {
  margin: 0,
  fontSize: '1.5rem',
  color: '#333',
};

const closeButtonStyles: React.CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#666',
  padding: '0',
  width: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const formStyles: React.CSSProperties = {
  padding: '24px',
};

const inputGroupStyles: React.CSSProperties = {
  marginBottom: '16px',
};

const labelStyles: React.CSSProperties = {
  display: 'block',
  marginBottom: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: '#333',
};

const inputStyles: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  fontSize: '16px',
  transition: 'border-color 0.2s',
  outline: 'none',
};

const errorStyles: React.CSSProperties = {
  color: '#dc3545',
  fontSize: '14px',
  marginBottom: '16px',
  textAlign: 'center',
};

const submitButtonStyles: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};

const disabledButtonStyles: React.CSSProperties = {
  backgroundColor: '#6c757d',
  cursor: 'not-allowed',
};

const switchModeStyles: React.CSSProperties = {
  padding: '16px 24px',
  borderTop: '1px solid #eee',
  textAlign: 'center',
};

const linkButtonStyles: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#007bff',
  cursor: 'pointer',
  textDecoration: 'underline',
  fontSize: 'inherit',
};

export default AuthModal;