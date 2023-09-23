import { MainMenu } from './src/components/main-menu';
import { Prison } from './src/components/game';
import { useGameStore, GameStore } from './store/store';

const App = () => {
  const isGameStarted = useGameStore((state: GameStore) => state.isGameStarted);

  return isGameStarted ? <Prison /> : <MainMenu />;
};

export default App;
