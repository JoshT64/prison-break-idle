// External Libraries
import { create } from 'zustand';
import { MouseEventHandler } from 'react';

// Firebase Libraries
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { app } from '../src/firebase/index';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import 'firebase/auth';

export type DbStore = {
  accountDetails: {
    picture: string;
    resources: {
      rocks: number;
    };
  } | null;
};

type ResourceKey = 'rocks' | 'gems';

export interface ResourceTypes {
  incrementResource: (
    resource: ResourceKey,
    autoGen?: number
  ) => MouseEventHandler<HTMLButtonElement>;
}

export const useDbStore = create((set) => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  let uid: string;

  let accumulatedIncrements = {
    rocks: 0,
    gems: 0,
  };

  let updateTimeout: NodeJS.Timeout | null = null;

  // Authentication state changes listener to get the UID
  const initAuthStateListener = () => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
        fetchAccountData(uid);
      } else {
        console.log('No user found');
      }
    });
  };

  const fetchAccountData = async (uid: string) => {
    const accountRef = doc(db, 'users', uid);
    try {
      const accountSnapshot = await getDoc(accountRef);
      if (accountSnapshot.exists()) {
        const accountData = accountSnapshot.data();
        setAccountData(accountData);
      } else {
        handleNoAccountData();
      }
    } catch (error) {
      handleAccountDataError(error);
    }
  };

  const setAccountData = (accountData: any) => {
    console.log('Fetched account data');
    set({
      accountDetails: {
        picture: accountData.picture || '',
        resources: accountData.resources,
      },
    });
  };

  const handleNoAccountData = () => {
    console.log('Account data does not exist.');
    set({ accountDetails: { picture: '' } });
  };

  const handleAccountDataError = (error: any) => {
    console.error('Error fetching account data:', error);
    set({ accountDetails: { picture: '' } });
  };

  const scheduleFirestoreUpdate = async () => {
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }
    updateTimeout = setTimeout(performFirestoreUpdate, 60 * 100);
  };

  const performFirestoreUpdate = async () => {
    const accountRef = doc(db, 'users', uid);
    const updates = prepareFirestoreUpdates();
    console.log(updates);
    if (Object.keys(updates).length > 0) {
      await updateDoc(accountRef, updates);
    }
  };

  const prepareFirestoreUpdates = () => {
    const updates: { [key: string]: any } = {};
    for (const resource of Object.keys(
      accumulatedIncrements
    ) as ResourceKey[]) {
      if (accumulatedIncrements[resource] > 0) {
        updates[`resources.${resource}`] = increment(
          accumulatedIncrements[resource]
        );
        accumulatedIncrements[resource] = 0;
      }
    }
    return updates;
  };

  const incrementResource = async (resource: ResourceKey, autoGen: number) => {
    if (!uid) {
      console.error('No user is authenticated.');
      return;
    }
    accumulatedIncrements[resource] += 1;
    scheduleFirestoreUpdate();
    if (autoGen) {
      autoIncrementLocalResource(resource, autoGen);
    } else {
      incrementLocalResource(resource);
    }
  };

  const incrementLocalResource = (resource: ResourceKey) => {
    set((state: { accountDetails: { resources: { [x: string]: number } } }) => {
      if (state.accountDetails && state.accountDetails.resources) {
        return {
          accountDetails: {
            ...state.accountDetails,
            resources: {
              ...state.accountDetails.resources,
              [resource]: state.accountDetails.resources[resource] + 1,
            },
          },
        };
      }
    });
  };

  let autoGenInterval: NodeJS.Timeout | null = null;

  const autoIncrementLocalResource = (
    resource: ResourceKey,
    autoGen: number
  ) => {
    if (autoGenInterval) {
      clearInterval(autoGenInterval);
    }

    // Start the auto-generation process
    autoGenInterval = setInterval(() => {
      set(
        (state: { accountDetails: { resources: { [x: string]: number } } }) => {
          if (state.accountDetails && state.accountDetails.resources) {
            return {
              accountDetails: {
                ...state.accountDetails,
                resources: {
                  ...state.accountDetails.resources,
                  [resource]: state.accountDetails.resources[resource] + 1,
                },
              },
            };
          }
        }
      );
    }, autoGen); // this will increment the resource every `autoGen` milliseconds
  };

  const unsubscribeAuthState = initAuthStateListener();

  return {
    unsubscribeAuthState,
    incrementResource,
  };
});
