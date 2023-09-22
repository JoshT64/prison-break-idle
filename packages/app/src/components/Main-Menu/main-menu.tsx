import { useGameStore, GameStore } from '../../../store/store';
import { Button } from '@prison-break-idle/design-system';

export const MainMenu = () => {
  const saveData = true;

  const startGame = useGameStore((state: GameStore) => state.startGame);
  const isGameStarted = useGameStore((state: GameStore) => state.isGameStarted);

  console.log(isGameStarted);

  return (
    <div className='c-main-menu--container'>
      <h1 className='c-main-menu--title'>Prison Break Idle</h1>
      <div className='c-main-menu--button-container'>
        <Button onClick={startGame}>New Game</Button>
        {saveData && (
          <Button
            onClick={startGame}
            disabled={!saveData}
            className='c-main-menu--button'
          >
            Load Game
          </Button>
        )}
        <Button onClick={startGame} className='c-main-menu--button'>
          Options
        </Button>
      </div>
    </div>
  );
};
