import { DbStore, ResourceTypes, useDbStore } from '../../../../store/dbStore';

export const useUserData = () => {
  const accountDetails = useDbStore((state: DbStore) => state.accountDetails);

  const resources = useDbStore(
    (state: DbStore) => state?.accountDetails?.resources
  );

  const incrementResource = useDbStore(
    (state: ResourceTypes) => state.incrementResource
  );

  return {
    resources,
    incrementResource,
    accountDetails,
  };
};
