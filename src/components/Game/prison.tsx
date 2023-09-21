import React from 'react';
import { useGameStore, GameStore } from '../../store/store';

export const Prison = () => {
  const stopGame = useGameStore((state: GameStore) => state.stopGame);
  return (
    <div className='c-prison--container'>
      <button onClick={stopGame}>Return</button>
      <h1 className='c-prison--title'>Prison</h1>
    </div>
  );
};
