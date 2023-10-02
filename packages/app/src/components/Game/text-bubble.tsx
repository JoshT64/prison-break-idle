import { Text } from '@pixi/react';
import { useState, useEffect, ReactNode } from 'react';
import * as PIXI from 'pixi.js';
import { useGameplayStore, GameplayStore } from '../../../store/gameplayStore';

const width = 500;
const height = 550;

interface MessageProps {
  dialogue: { step: number; text: string }[];
  interval: number;
  children?: (text: string) => ReactNode;
}

interface TextBubbleProps extends MessageProps {
  step: number;
}

const style = new PIXI.TextStyle({
  fill: 'yellow',
  fontSize: 40,
  fontFamily: 'Gamestation',
  align: 'left',
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

const Message = ({ dialogue, interval = 0, children }: MessageProps) => {
  const step = useGameplayStore((state: GameplayStore) => state.dialogueStep);
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

  return (
    <Message dialogue={dialogue} interval={interval}>
      {(text: string) => (
        <Text
          text={text}
          x={width + 30}
          y={height / 2}
          anchor={0}
          style={style}
          interactive
          pointerdown={() => {
            incrementDialogueStep(step);
          }}
        />
      )}
    </Message>
  );
};

export default TextBubble;
