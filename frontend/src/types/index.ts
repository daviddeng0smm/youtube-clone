export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface Game {
  id: number;
  name: string;
  platform: 'playstation' | 'steam';
  release_date: string;
  img_url: string;
  genre: string;
  total_codes: number;
  available_codes: number;
  created_at: string;
}

export interface GameCode {
  id: number;
  code: string;
  redeemed_status: boolean;
  game_id: number;
  owner_id: number | null;
  redeemed_at: string | null;
  redeemer_id: number | null;
  game_name: string;
  platform: string;
  owner_name: string | null;
  redeemer_name: string | null;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface ApiResponse<T> {
  message?: string;
  error?: string;
  data?: T;
}