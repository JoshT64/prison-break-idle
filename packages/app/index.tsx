import { MainMenu } from './src/components/main-menu';
import { Login } from './src/components/login';
import { Loader } from './src/components/loader';
import PixiLoader from './src/components/game/pixi-loader/pixi-loader';
import { Prison } from './src/components/game';
import { useStore } from './src/components/main-menu/useStore';
import { useUserData } from './src/components/game/hooks/useUserData';
import { useDbStore } from './store/dbStore';
import { useGameplay } from './src/components/game/pixi-loader/hooks/useGameplay';

const App = () => {
  const { isLoggedIn, isGameStarted } = useStore();
  const { accountDetails } = useUserData();
  const { isDialogueDone } = useGameplay();

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
