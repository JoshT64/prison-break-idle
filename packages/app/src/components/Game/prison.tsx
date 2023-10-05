import { useState } from 'react';
import { Asset, Button, Container } from '@prison-break-idle/design-system';
import { AppBar } from '../app-bar';
import { assetMapping } from '../../assets/assetMappings';
import { useUserData } from './hooks/useUserData';
import { useStore } from '../main-menu/useStore';

export const Prison = () => {
  const { resources, incrementResource } = useUserData();
  const { stopGame } = useStore();

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
        <Button
          onClick={() => {
            console.log('increment rocks clicked!');
            incrementResource('rocks');
          }}
        >
          Start Mining Rocks
        </Button>
        <Button
          onClick={() => {
            console.log('increment gems clicked!');
            incrementResource('gems');
          }}
        >
          Start Mining Gems
        </Button>

        <Asset
          animation='bounce'
          size='medium'
          src={assetMapping.playeridle}
        ></Asset>
      </Container>
    </div>
  );
};
