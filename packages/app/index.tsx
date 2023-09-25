import { MainMenu } from './src/components/main-menu';
import { Prison } from './src/components/game';
import { useGameStore, GameStore } from './store/store';
import { Login } from './src/components/login';

const App = () => {
  const isGameStarted = useGameStore((state: GameStore) => state.isGameStarted);
  const isLoggedIn = useGameStore((state: GameStore) => state.isLoggedIn);

  console.log(isGameStarted);
  switch (isLoggedIn) {
    case false:
      return <Login />;
    case true:
      return isGameStarted ? <Prison /> : <MainMenu />;
    default:
      return <div>Something went wrong</div>;
  }
};

export default App;
