import { Asset } from './asset';
import { Assets } from '../../../assets/assets.types';
import { Container } from '../container';
import { Text } from '../texts';

export default {
  title: 'Components/Assets',
};

const renderAssets = () =>
  Object.values(Assets).map((asset: Assets) => {
    return (
      <div key={asset} style={{ textAlign: 'center' }}>
        <Asset size='medium' src={asset}></Asset>
        <Text>{asset}</Text>
      </div>
    );
  });
export const Library = () => {
  return (
    <div style={{ background: '#3498db', margin: '10px' }}>
      <Container display='flex'>{renderAssets()}</Container>
    </div>
  );
};
