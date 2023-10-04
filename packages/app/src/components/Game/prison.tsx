import { useState } from 'react';
import { useGameStore, GameStore } from '../../../store/store';
import {
  AppFooter,
  Asset,
  Button,
  Container,
} from '@prison-break-idle/design-system';
import { useDbStore, DbStore } from '../../../store/dbStore';
import { AppBar } from '../app-bar';
import { assetMapping } from '../../assets/assetMappings';

export const Prison = () => {
  const stopGame = useGameStore((state: GameStore) => state.stopGame);
  const resources = useDbStore(
    (state: DbStore) => state.accountDetails.resources
  );

  console.log(resources);

  const [openPause, setOpenPause] = useState(false);

  document.addEventListener(
    'keydown',
    (e) => e.key === 'Escape' && setOpenPause(!openPause)
  );

  return (
    <div>
      <AppBar resources={resources}></AppBar>

      <Container className='c-container' display='flex'>
        {openPause && <Button onClick={stopGame}>Return to Main Menu</Button>}
        <Asset
          animation='bounce'
          size='medium'
          src={assetMapping.playeridle}
        ></Asset>
      </Container>
    </div>
  );
};
