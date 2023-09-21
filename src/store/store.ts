import { create } from 'zustand';

export type GameStore = {
  isGameStarted: boolean;
  startGame?: () => void;
  stopGame?: () => void;
};

export const useGameStore = create((set) => ({
  startGame: () => set({ isGameStarted: true }),
  stopGame: () => set({ isGameStarted: false }),
  isGameStarted: false,
}));
