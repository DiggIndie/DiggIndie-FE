import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  accessToken: string | null;
  isAuthed: boolean;
  userId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      userId: null,
      isAuthed: false,
      login: (token, userId) => set({ accessToken: token, userId, isAuthed: true }),
      logout: () => set({ accessToken: null, userId: null, isAuthed: false }),
    }),
    { name: 'auth-storage' }
  )
);
