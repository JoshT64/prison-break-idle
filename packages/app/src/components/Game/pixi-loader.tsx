import { useState, useEffect } from 'react';
import { Sprite, Container, Stage } from '@pixi/react';
import { Application } from 'pixi.js';
import prisoner from '../../../../design-system/assets/playeridle.png';
import TextBubble from './text-bubble';
import { useGameplayStore, GameplayStore } from '../../../store/gameplayStore';
import { dialogue1 } from './dialogue/dialogue1';

const PixiLoader = () => {
  const [stageWidth, setStageWidth] = useState(window.innerWidth);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);

  const getDialogueStep = useGameplayStore(
    (state: GameplayStore) => state.dialogueStep
  );
  useEffect(() => {
    const handleResize = () => {
      setStageWidth(window.innerWidth);
      setStageHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Stage width={stageWidth} height={stageHeight}>
      <Container mousedown={() => console.log('mousedown')}>
        <Sprite
          image={prisoner}
          scale={{ x: 0.1, y: 0.1 }}
          anchor={0.5}
          x={window.innerWidth - 750}
          y={window.innerHeight - 560}
        />
        <TextBubble dialogue={dialogue1} step={getDialogueStep} interval={64} />
      </Container>
    </Stage>
  );
};

export default PixiLoader;
