import { Header } from './header/header';
import { SubText } from './subtext/subtext';
import { Text } from './text/text';

export default {
  title: 'Components/Text',
};

export const HeaderText = () => {
  return (
    <div style={{ background: 'black' }}>
      <Header>Header</Header>
    </div>
  );
};

export const SubTextText = () => {
  return (
    <div style={{ background: 'black' }}>
      <SubText>SubText</SubText>
    </div>
  );
};

export const TextComponent = () => {
  return (
    <div style={{ background: 'black' }}>
      <Text>Text</Text>
    </div>
  );
};
