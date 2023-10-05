import {
  Asset,
  Avatar,
  Button,
  Container,
  Header,
} from '@prison-break-idle/design-system';
import { AppBar } from '../app-bar';
import playeridle from '../../../../design-system/assets/playeridle.png';
import { useStore } from './useStore';

export const MainMenu = () => {
  const { startGame, logout, newGame, saveData } = useStore();

  return (
    <div>
      <AppBar />
      <Container className='c-main-menu--container'>
        <Header>Prison Break Idle</Header>
        <div className='c-main-menu--button-container'>
          <Asset animation='bounce' size='medium' src={playeridle}></Asset>

          <Button onClick={newGame}>New Game</Button>
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
    </div>
  );
};
