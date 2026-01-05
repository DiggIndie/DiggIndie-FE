import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  accessToken: string | null;
  isAuthed: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthed: false,
      login: (token) => set({ accessToken: token, isAuthed: true }),
      logout: () => set({ accessToken: null, isAuthed: false }),
    }),
    { name: 'auth-storage' }
  )
);
