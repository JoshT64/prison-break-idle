import { MainMenu } from './src/components/Main-Menu';
import { Prison } from './src/components/Game/prison';
import { useGameStore, GameStore } from './store/store';

const App = () => {
  const isGameStarted = useGameStore((state: GameStore) => state.isGameStarted);

  return isGameStarted ? <Prison /> : <MainMenu />;
};

export default App;
