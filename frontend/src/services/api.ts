import axios from 'axios';
import { Game, GameCode, User } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Games API
export const gamesApi = {
  getAll: async (platform?: string): Promise<{ games: Game[] }> => {
    const response = await api.get('/games', { params: { platform } });
    return response.data;
  },

  getById: async (id: number): Promise<{ game: Game }> => {
    const response = await api.get(`/games/${id}`);
    return response.data;
  },

  create: async (gameData: Partial<Game>) => {
    const response = await api.post('/games', gameData);
    return response.data;
  },

  update: async (id: number, gameData: Partial<Game>) => {
    const response = await api.put(`/games/${id}`, gameData);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/games/${id}`);
    return response.data;
  },

  redeemCode: async (gameId: number) => {
    const response = await api.post(`/games/${gameId}/redeem`);
    return response.data;
  },

  getCodes: async (gameId: number): Promise<{ codes: GameCode[] }> => {
    const response = await api.get(`/games/${gameId}/codes`);
    return response.data;
  },
};

// Game Codes API
export const gameCodesApi = {
  getAll: async (): Promise<{ codes: GameCode[] }> => {
    const response = await api.get('/codes');
    return response.data;
  },

  getMyCodes: async (): Promise<{ codes: GameCode[] }> => {
    const response = await api.get('/codes/my-codes');
    return response.data;
  },

  create: async (codeData: { code: string; game_id: number; owner_id?: number }) => {
    const response = await api.post('/codes', codeData);
    return response.data;
  },

  generateBulk: async (gameId: number, count: number, prefix?: string) => {
    const response = await api.post('/codes/bulk', { gameId, count, prefix });
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/codes/${id}`);
    return response.data;
  },
};

export default api;