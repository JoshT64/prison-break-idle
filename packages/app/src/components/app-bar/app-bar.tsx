import { Avatar } from '@prison-break-idle/design-system';
import { useDbStore, DbStore } from '../../../store/dbStore';

export const AppBar = () => {
  const accountDetails = useDbStore((state: DbStore) => state.accountDetails);

  return (
    <>
      {accountDetails && (
        <Avatar
          size='medium'
          label='profile-avatar'
          src={accountDetails?.picture}
        ></Avatar>
      )}
    </>
  );
};
