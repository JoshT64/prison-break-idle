import { AppFooter } from './app-footer';
import { ResourceBar } from '../resource-bar';
import { Asset } from '../asset';
import { SubText, Text } from '../texts';

export default {
  title: 'Components/AppFooter',
};

interface AppBarProps {
  resources?: { rocks: number };
}

export interface Resources {
  [key: string]: number;
}

const resources = { rocks: 369, test: 1, test2: 15, test3: 19, test4: 4 };

const renderResources = (resources: Resources) => {
  if (!resources) return null;

  return Object.keys(resources).map((name) => {
    return (
      <div>
        <Asset src={'rocks'}></Asset>
        <SubText>{`${resources[name]}`}</SubText>
      </div>
    );
  });
};

export const Default = () => {
  return (
    <div style={{ background: 'black' }}>
      <AppFooter>
        <ResourceBar>{renderResources(resources)}</ResourceBar>
      </AppFooter>
    </div>
  );
};
