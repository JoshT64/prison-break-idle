import { create } from 'zustand';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../src/firebase/index';
import 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export type DbStore = {
  accountDetails: {
    picture: string;
    resources: {
      rocks: number;
    };
  } | null;
};

export const useDbStore = create((set) => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  let uid;

  // Listen for authentication state changes to get the UID
  const unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;

      // Fetch account data and update the store
      fetchAccountData(uid);
    } else {
      console.log('No user found');
    }
  });

  const fetchAccountData = async (uid: string) => {
    try {
      const accountRef = doc(db, 'users', uid);
      const accountSnapshot = await getDoc(accountRef);

      if (accountSnapshot.exists()) {
        const accountData = accountSnapshot.data();
        console.log('Fetched account data');
        set({
          accountDetails: {
            picture: accountData.picture || '',
            resources: accountData.resources,
            saveData: accountData.saveData,
          },
        });
      } else {
        console.log('Account data does not exist.');
        set({ accountDetails: { picture: '' } });
      }
    } catch (error) {
      console.error('Error fetching account data:', error);
      set({ accountDetails: { picture: '' } });
    }
  };

  // Cleanup the authentication state listener when the store is no longer in use
  return () => {
    unsubscribeAuthState();
  };
});
