import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
  signOut as signOutFirebase,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAxsPN8BsZMcv-GHwxSw0L3sOa4H3XmXfw',
  authDomain: 'prison-break-idle.firebaseapp.com',
  projectId: 'prison-break-idle',
  storageBucket: 'prison-break-idle.appspot.com',
  messagingSenderId: '392410655531',
  appId: '1:392410655531:web:db000c8872e5648b70b36e',
  measurementId: 'G-W9T2FT9KCG',
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const signIn = (token: string) => {
  const credential = GoogleAuthProvider.credential(token);

  signInWithCredential(auth, credential)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log('User signed in:', user.uid);
      const token = await user.getIdToken();
      localStorage.setItem('googleCredential', token);
      // Todo: Update resource db
      const resources = {
        rocks: 0,
      };
      const saveData = {};
      await addUserToFirestore(
        user.uid,
        user.email,
        user.photoURL,
        resources,
        saveData
      );
    })
    .catch((error) => {
      console.error('Signin error:', error);
    });
};

export const signOut = async () => {
  try {
    await signOutFirebase(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Sign out error:', error);
  }
};

const addUserToFirestore = async (
  uid: string,
  email: string,
  picture: string,
  resources: object,
  saveData: object
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
