import { MainStore, useMainStore } from '../../../store/store';
import { useGameplayStore, GameplayStore } from '../../../store/gameplayStore';

export const useStore = () => {
  let saveData = true;
  const login = useMainStore((state: MainStore) => state.login);
  const startGame = useMainStore((state: MainStore) => state.startGame);
  const stopGame = useMainStore((state: MainStore) => state.stopGame);
  const logout = useMainStore((state: MainStore) => state.logout);
  const isGameStarted = useMainStore((state: MainStore) => state.isGameStarted);
  const isLoggedIn = useMainStore((state: MainStore) => state.isLoggedIn);

  const resetDialogueStep = useGameplayStore(
    (state: GameplayStore) => state.resetDialogueStep
  );

  const newGame = () => {
    startGame();
    resetDialogueStep();
  };

  return {
    startGame,
    stopGame,
    newGame,
    logout,
    saveData,
    login,
    isLoggedIn,
    isGameStarted,
  };
};
