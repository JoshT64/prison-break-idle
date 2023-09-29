import { useGameStore, GameStore } from '../../../store/store';
import {
  Avatar,
  Button,
  Container,
  Header,
} from '@prison-break-idle/design-system';
import { AppBar } from '../app-bar';

export const MainMenu = () => {
  const saveData = true;
  const startGame = useGameStore((state: GameStore) => state.startGame);
  const logout = useGameStore((state: GameStore) => state.logout);

  return (
    <Container className='c-main-menu--container'>
      <AppBar />
      <Header>Prison Break Idle</Header>
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
        <Button onClick={logout}>Logout</Button>
      </div>
    </Container>
  );
};
