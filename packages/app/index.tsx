import { MainMenu } from './src/components/main-menu';
import { useGameStore, GameStore } from './store/store';
import { Login } from './src/components/login';
import { useDbStore, DbStore } from './store/dbStore';
import { Loader } from './src/components/loader';
import PixiLoader from './src/components/game/pixi-loader';
import { useGameplayStore, GameplayStore } from './store/gameplayStore';
import { Prison } from './src/components/game';

const App = () => {
  const isGameStarted = useGameStore((state: GameStore) => state.isGameStarted);
  const isLoggedIn = useGameStore((state: GameStore) => state.isLoggedIn);
  const accountDetails = useDbStore((state: DbStore) => state.accountDetails);
  const isDialogueDone = useGameplayStore(
    (state: GameplayStore) => state.dialogueDone
  );

  // Todo: Add React-router and route based on url to these pages? I think so

  const renderContent = () => {
    if (!isLoggedIn) {
      return <Login />;
    }

    if (!accountDetails) {
      return <Loader />;
    }

    // isGameStarted && newGame

    if (isGameStarted && !isDialogueDone) {
      return <PixiLoader />;
    }

    if (isDialogueDone && isGameStarted) {
      return <Prison />;
    }

    return <MainMenu />;
  };

  return renderContent();
};

export default App;
