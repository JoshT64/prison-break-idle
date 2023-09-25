import { signIn, signOut } from '../src/firebase/index';
import { create } from 'zustand';

export type GameStore = {
  isGameStarted: boolean;
  startGame?: () => void;
  stopGame?: () => void;
  isLoggedIn: boolean;
  login?: (token: string) => void;
  logout?: () => void;
  accountDetails: {};
};

export const useGameStore = create((set) => ({
  startGame: () => set({ isGameStarted: true }),
  stopGame: () => set({ isGameStarted: false }),
  isGameStarted: false,
  login: (token: string) => {
    signIn(token);
    set({ isLoggedIn: true });
  },
  logout: () => {
    localStorage.removeItem('googleCredential');
    signOut();
    set({ isLoggedIn: false });
  },
  isLoggedIn: localStorage.getItem('googleCredential') ? true : false,
  accountDetails: {},
}));
