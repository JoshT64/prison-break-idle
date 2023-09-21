import { useEffect } from 'react';
import { useGameStore, GameStore } from '../../store/store';

export const MainMenu = () => {
  const saveData = true;

  const startGame = useGameStore((state: GameStore) => state.startGame);
  const isGameStarted = useGameStore((state: GameStore) => state.isGameStarted);

  console.log(isGameStarted);

  return (
    <div className='c-main-menu--container'>
      <h1 className='c-main-menu--title'>Prison Break Idle</h1>
      <div className='c-main-menu--button-container'>
        <button onClick={startGame} className='c-main-menu--button'>
          New Game
        </button>
        {saveData && (
          <button disabled={!saveData} className='c-main-menu--button'>
            Load Game
          </button>
        )}
        <button className='c-main-menu--button'>Options</button>
      </div>
    </div>
  );
};
