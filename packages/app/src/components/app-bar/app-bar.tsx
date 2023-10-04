import {
  AppFooter,
  AppHeader,
  Asset,
  Avatar,
  ResourceBar,
  SubText,
} from '@prison-break-idle/design-system';
import { useDbStore, DbStore } from '../../../store/dbStore';
import { assetMapping } from '../../assets/assetMappings';
import { Assets } from '@prison-break-idle/design-system/assets/assets.types';

interface AppBarProps {
  resources?: { rocks: number };
}

export interface Resources {
  [key: string]: number;
}

export const AppBar = ({ resources }: AppBarProps) => {
  const accountDetails = useDbStore((state: DbStore) => state.accountDetails);

  const renderResources = (resources: Resources | undefined) => {
    if (!resources) return null;

    return Object.keys(resources).map((name: keyof typeof Assets) => {
      return (
        <div key={name}>
          <Asset src={assetMapping[name]}></Asset>
          <SubText>{`${resources[name]}`}</SubText>
        </div>
      );
    });
  };

  return (
    <div>
      <AppHeader>
        {accountDetails && (
          <>
            <Avatar
              size='medium'
              label='profile-avatar'
              src={accountDetails?.picture}
            ></Avatar>
            {/* Todo: Add Resources bar component which renders out all ur resources based on size of object */}
          </>
        )}
      </AppHeader>
      {resources && (
        <AppFooter>
          <ResourceBar>{renderResources(resources)}</ResourceBar>
        </AppFooter>
      )}
    </div>
  );
};
