import { useCallback, useEffect, useState } from 'react';
import {
  GameplayStore,
  useGameplayStore,
} from '../../../../../store/gameplayStore';

export const useGameplay = () => {
  const [stageWidth, setStageWidth] = useState(window.innerWidth);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);
  const [arrowYOffset, setArrowYOffset] = useState(0);
  const [direction, setDirection] = useState(1);

  const step = useGameplayStore((state: GameplayStore) => state.dialogueStep);

  const incrementDialogueStep = useGameplayStore(
    (state: GameplayStore) => state.incrementDialogueStep
  );

  const isDialogEnded = useGameplayStore(
    (state: GameplayStore) => state.isDialogEnded
  );

  const onDialogEnd = useGameplayStore(
    (state: GameplayStore) => state.onDialogEnd
  );

  const isDialogueDone = useGameplayStore(
    (state: GameplayStore) => state.dialogueDone
  );

  const handlePointerDown = useCallback(() => {
    onDialogEnd(false);
    incrementDialogueStep(step);
  }, [incrementDialogueStep, step]);

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
    if (isDialogEnded) {
      const interval = setInterval(() => {
        if (arrowYOffset >= 3) {
          setDirection(-1); // Reverse direction
        } else if (arrowYOffset <= 0) {
          setDirection(1); // Reverse direction
        }

        setArrowYOffset((prevOffset) => prevOffset + direction * 1.3); // 1.3 is the pixel amount for each frame of movement
      }, 70); // speed the arrow moves at

      return () => clearInterval(interval);
    }
  }, [isDialogEnded, arrowYOffset]);

  const defaultWidth = 550;
  const defaultHeight = 550;

  const getWindowDimensions = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const calculateTextPosition = () => {
    const { width, height } = getWindowDimensions();

    return {
      x:
        width > 1920
          ? width / 2.45
          : width > 1470
          ? width / 2.47
          : width < 1300
          ? defaultWidth / 1.25
          : defaultWidth,
      y: height > 1000 ? defaultHeight / 1 : defaultHeight / 2,
    };
  };

  return {
    stageWidth,
    stageHeight,
    step,
    isDialogEnded,
    arrowYOffset,
    handlePointerDown,
    onDialogEnd,
    calculateTextPosition,
    isDialogueDone,
  };
};
