import { create } from 'zustand';
import { dialogue1 } from '../src/components/game/dialogue/dialogue1';

export type GameplayStore = {
  dialogueStep: number;
  incrementDialogueStep: (step: number) => void;
};

export const NEW_GAME = 'NEW_GAME';

export const useGameplayStore = create((set) => ({
  dialogueStep: 0,
  incrementDialogueStep: (step: number) => {
    if (step < dialogue1.length - 1) {
      set({ dialogueStep: step + 1 });
    } else {
      // Transition to new scene
      console.log('Step exceeds dialogue length.');
    }
  },
  checkpoint: NEW_GAME,
}));
