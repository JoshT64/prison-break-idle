import { Text } from '@pixi/react';
import { useState, useEffect, ReactNode, useCallback } from 'react';
import * as PIXI from 'pixi.js';
import { useGameplayStore, GameplayStore } from '../../../store/gameplayStore';

const defaultWidth = 550;
const defaultHeight = 550;

const style = new PIXI.TextStyle({
  fill: 'yellow',
  fontSize: 40,
  fontFamily: 'Gamestation',
  align: 'justify',
  stroke: '#687500',
  strokeThickness: 1,
  wordWrap: true,
  wordWrapWidth: 420,
  dropShadow: true,
  dropShadowColor: '#687500',
  dropShadowBlur: 10,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 2,
  letterSpacing: 1,
});

interface MessageProps {
  dialogue: { step: number; text: string }[];
  interval: number;
  children?: (text: string) => ReactNode;
}

interface TextBubbleProps extends MessageProps {
  step: number;
}

const Message = ({ dialogue, interval = 0, children }: MessageProps) => {
  const step = useGameplayStore((state: GameplayStore) => state.dialogueStep);

  const onDialogEnd = useGameplayStore(
    (state: GameplayStore) => state.onDialogEnd
  );

  const dialogueChars = () =>
    dialogue[step]?.text.split('').concat([...Array(10)].map(() => ''));

  const [textState, setTextState] = useState({
    text: '',
    rest: dialogueChars(),
  });

  useEffect(() => {
    let i: NodeJS.Timeout;
    const update = () => {
      setTextState(({ text, rest }) => {
        if (rest?.length === 0) {
          onDialogEnd(true);
          clearInterval(i);
          return { text, rest };
        }
        const line = text + rest?.shift();
        return { text: line, rest };
      });
    };

    setTextState({ text: '', rest: dialogueChars() }); // Update textState when step changes

    i = setInterval(update, interval);

    return () => {
      clearInterval(i);
    };
  }, [interval, dialogue, step]);

  return children(textState.text);
};

const TextBubble = ({ dialogue, interval, step }: TextBubbleProps) => {
  const incrementDialogueStep = useGameplayStore(
    (state: GameplayStore) => state.incrementDialogueStep
  );

  const onDialogEnd = useGameplayStore(
    (state: GameplayStore) => state.onDialogEnd
  );

  const handlePointerDown = useCallback(() => {
    onDialogEnd(false);
    incrementDialogueStep(step);
  }, [incrementDialogueStep, step]);

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

  const textPosition = calculateTextPosition();

  return (
    <Message dialogue={dialogue} interval={interval}>
      {(text: string) => (
        <Text
          text={text}
          {...textPosition}
          anchor={0}
          style={style}
          interactive
          pointerdown={handlePointerDown}
          cursor='pointer'
        />
      )}
    </Message>
  );
};

export default TextBubble;
