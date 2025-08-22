import { create } from 'zustand';

// 1. Defina a interface do estado de autenticação
interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
}

// 2. Defina a interface das ações que manipularão o estado
interface AuthActions {
  login: (token: string, userData: { id: string; email: string; name: string }) => void;
  logout: () => void;
  initialize: () => void;
}

// 3. Crie o "store"
export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  // Estado inicial
  isAuthenticated: false,
  accessToken: null,
  user: null,

  // Ações
  login: (token, userData) => {
    set({
      isAuthenticated: true,
      accessToken: token,
      user: userData,
    });
    // Opcional: Armazena o token no localStorage para persistência
    localStorage.setItem('access_token', token);
  },

  logout: () => {
    set({
      isAuthenticated: false,
      accessToken: null,
      user: null,
    });
    // Remove o token do localStorage
    localStorage.removeItem('access_token');
  },

  // Ação para inicializar o estado a partir do localStorage ao carregar a aplicação
  initialize: () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Nota: Você precisaria decodificar o token aqui para obter os dados do usuário,
      // ou ter uma rota de API para "me" para obter os dados do usuário.
      // Por simplicidade, assumimos que os dados do usuário estão disponíveis.
      // Em uma aplicação real, você faria uma requisição para uma rota /auth/me
      // para validar o token e obter os dados do usuário.
      set({
        isAuthenticated: true,
        accessToken: token,
        // user: decodedToken.payload ou dados da requisição /auth/me
      });
    }
  },
}));