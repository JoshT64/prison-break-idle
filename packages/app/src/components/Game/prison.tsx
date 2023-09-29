import { useGameStore, GameStore } from '../../../store/store';
import { Button } from '@prison-break-idle/design-system';
import PixiComponent from './pixi-loader';

export const Prison = () => {
  const stopGame = useGameStore((state: GameStore) => state.stopGame);
  return (
    <div className='c-prison--container'>
      <Button onClick={stopGame}>Return to Main Menu</Button>
      <h1 className='c-prison--title'>Prison</h1>
    </div>
  );
};
