import { signIn, signOut } from '../store/dbStore';
import { create } from 'zustand';

const token = localStorage.getItem('googleCredential');

const verifyGoogleCredential = async () => {
  if (!token) return false;
  try {
    const response = await fetch(
      'http://localhost:3000/verify-google-credential',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log('Google credential is valid');
      return true;
    } else {
      console.log('Google credential is invalid');
      return false;
    }
  } catch (error) {
    console.error('Error verifying Google credential:', error);
  }
};

export type MainStore = {
  isGameStarted: boolean;
  startGame?: () => void;
  stopGame?: () => void;
  isLoggedIn: boolean;
  login?: (token: string) => void;
  logout?: () => void;
};

export const useMainStore = create((set) => ({
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
  isLoggedIn: verifyGoogleCredential() && token ? true : false,
  accountDetails: {},
}));
