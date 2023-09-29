import { useState, useEffect, useMemo } from 'react';
import { Sprite, Container, Stage } from '@pixi/react';
import { Texture } from 'pixi.js';
import ground from '../../../../design-system/assets/ground.png';

const minTileCount = 5; // Minimum number of tiles in both x and y axes

const PixiLoader = () => {
  const [stageWidth, setStageWidth] = useState(window.innerWidth);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);

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

  // Calculate the number of tiles based on the aspect ratio
  const tileCountX = Math.max(
    minTileCount,
    Math.floor(stageWidth / minTileCount)
  );
  const tileCountY = Math.max(
    minTileCount,
    Math.floor(stageHeight / minTileCount)
  );

  const tileWidth = 120;
  const tileHeight = 50;

  const tiles = [];
  for (let i = 0; i < tileCountX; i++) {
    for (let j = 0; j < tileCountY; j++) {
      tiles.push(
        <Sprite
          key={`tile-${i}-${j}`}
          texture={Texture.from(ground)}
          x={i * tileWidth}
          y={j * tileHeight}
          width={tileWidth}
          height={tileHeight}
        />
      );
    }
  }

  return (
    <Stage width={stageWidth} height={stageHeight}>
      <Container>{tiles}</Container>
    </Stage>
  );
};

export default PixiLoader;
