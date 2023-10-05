import { Sprite, Container, Stage } from '@pixi/react';
import { assetMapping } from '../../../assets/assetMappings';
import TextBubble from './text-bubble';
import { dialogue1 } from '../dialogue/dialogue1';
import { useGameplay } from './hooks/useGameplay';

const PixiLoader = () => {
  const {
    arrowYOffset,
    step,
    handlePointerDown,
    isDialogEnded,
    stageHeight,
    stageWidth,
  } = useGameplay();

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
        <TextBubble dialogue={dialogue1} step={step} interval={64} />
        {isDialogEnded && (
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
