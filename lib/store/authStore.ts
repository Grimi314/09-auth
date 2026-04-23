import { create } from 'zustand'
import type { User } from '@/types/user'

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setIsAuthenticated: (value: boolean) => void; 
  clearAuth: () => void; 
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({
    user,
    isAuthenticated: true,
  }),

  setIsAuthenticated: (value) => set({ 
    isAuthenticated: value,
  }),

  clearAuth: () => set({ 
    user: null,
    isAuthenticated: false,
  }),

  logout: () => set({
    isAuthenticated: false,
    user: null,
  })
}))