import { create } from 'zustand';
import { dialogue1 } from '../src/components/game/dialogue/dialogue1';

export type GameplayStore = {
  dialogueStep: number;
  incrementDialogueStep: (step: number) => void;
  dialogueDone: boolean;
};

export const useGameplayStore = create((set) => ({
  dialogueStep: 0,
  dialogueDone: false,

  incrementDialogueStep: (step: number) => {
    if (step < dialogue1.length - 1) {
      set({ dialogueStep: step + 1 });
    } else {
      // Transition to new scene
      set({ dialogueDone: true });
    }
  },
}));
