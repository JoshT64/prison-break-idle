import { create } from 'zustand';
import { MouseEventHandler } from 'react';
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
  onAuthStateChanged,
  signOut as signOutFirebase,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
// App initialization
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Types and Interfaces
export type DbStore = {
  accountDetails: {
    picture: string;
    resources: {
      rocks: number;
    };
  } | null;
};

type ResourceKey = 'rocks' | 'gems';
interface Resources {
  rocks?: number;
  gems?: number;
}
export interface ResourceTypes {
  incrementResource: (
    resource: ResourceKey,
    autoGen?: number
  ) => MouseEventHandler<HTMLButtonElement>;
}

// Auth functions
export const signIn = async (token: string) => {
  const credential = GoogleAuthProvider.credential(token);
  try {
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;
    console.log('User signed in:', user.uid);
    const idToken = await user.getIdToken();
    localStorage.setItem('googleCredential', idToken);

    const resources = await fetchResourcesForUser(user.uid);
    await addUserToFirestore(user.uid, user.email, user.photoURL, resources);
  } catch (error) {
    console.error('Signin error:', error);
  }
};

export const signOut = async () => {
  try {
    await signOutFirebase(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Sign out error:', error);
  }
};

const fetchResourcesForUser = async (uid: string): Promise<Resources> => {
  const accountRef = doc(db, 'users', uid);
  const accountSnapshot = await getDoc(accountRef);

  return accountSnapshot.exists() && accountSnapshot.data()
    ? (accountSnapshot.data().resources as Resources)
    : {};
};

const addUserToFirestore = async (
  uid: string,
  email: string,
  picture: string,
  resources: Resources
) => {
  const userRef = doc(db, 'users', uid);
  try {
    await setDoc(userRef, {
      uid,
      email,
      picture,
      resources,
    });
  } catch (error) {
    console.error('Error adding user to Firestore:', error);
  }
};

// Zustand store
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
    return onAuthStateChanged(auth, (user: { uid: string }) => {
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
    console.log('Fetched account data', accountData);
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
    console.log('firestore update');
    updateTimeout = setTimeout(performFirestoreUpdate, 60 * 1000);
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
    console.log(resource, accumulatedIncrements);
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
