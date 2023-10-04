import { useState, useEffect, useCallback } from 'react';
import { Sprite, Container, Stage } from '@pixi/react';
import { assetMapping } from '../../assets/assetMappings';
import TextBubble from './text-bubble';
import { useGameplayStore, GameplayStore } from '../../../store/gameplayStore';
import { dialogue1 } from './dialogue/dialogue1';

const PixiLoader = () => {
  const [stageWidth, setStageWidth] = useState(window.innerWidth);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);
  const [arrowYOffset, setArrowYOffset] = useState(0);
  const [direction, setDirection] = useState(1);

  const getDialogueStep = useGameplayStore(
    (state: GameplayStore) => state.dialogueStep
  );

  const incrementDialogueStep = useGameplayStore(
    (state: GameplayStore) => state.incrementDialogueStep
  );

  const isDialogueEnded = useGameplayStore(
    (state: GameplayStore) => state.isDialogEnded
  );

  const onDialogEnd = useGameplayStore(
    (state: GameplayStore) => state.onDialogEnd
  );

  const handlePointerDown = useCallback(() => {
    onDialogEnd(false);
    incrementDialogueStep(getDialogueStep);
  }, [incrementDialogueStep, getDialogueStep]);

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

  useEffect(() => {
    if (isDialogueEnded) {
      const interval = setInterval(() => {
        if (arrowYOffset >= 3) {
          // 10 is the max pixel movement in upward direction
          setDirection(-1); // Reverse direction
        } else if (arrowYOffset <= 0) {
          // Back to original position
          setDirection(1); // Reverse direction
        }

        setArrowYOffset((prevOffset) => prevOffset + direction * 1.3); // 2 is the pixel amount for each frame of movement
      }, 70); // Adjust 30ms to how fast you want the arrow to move up and down

      return () => clearInterval(interval); // Cleanup interval when component is unmounted
    }
  }, [isDialogueEnded, arrowYOffset]);

  return (
    <Stage width={stageWidth} height={stageHeight}>
      <Container>
        <Sprite
          image={assetMapping.playeridle}
          scale={{ x: 0.1, y: 0.1 }}
          anchor={0.5}
          x={stageWidth - stageWidth / 2}
          y={stageHeight - stageHeight / 1.42}
        />
      </Container>
      <Container cursor='pointer'>
        <TextBubble dialogue={dialogue1} step={getDialogueStep} interval={64} />
        {isDialogueEnded && (
          <Sprite
            image={assetMapping.arrowdown}
            anchor={0.5}
            x={stageWidth - stageWidth / 2}
            y={stageHeight - stageHeight / 2.1 - arrowYOffset}
            interactive
            pointerdown={handlePointerDown}
            cursor='pointer'
          />
        )}
      </Container>
    </Stage>
  );
};

export default PixiLoader;
