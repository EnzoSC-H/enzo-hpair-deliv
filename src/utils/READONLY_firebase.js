// !!!!!!!!!!!!!!!!!!!!!!!
// ! DO NOT EDIT THIS PAGE
// !!!!!!!!!!!!!!!!!!!!!!!
// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';
import StyledFirebaseAuth from '../components/StyledFirebaseAuth.tsx';

// Import additional authentication provider
import { GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBtTlAUMih6fxZ73E1vz82YLWD35158a10',
  authDomain: 'hpair-deliv.firebaseapp.com',
  projectId: 'hpair-deliv',
  storageBucket: 'hpair-deliv.appspot.com',
  messagingSenderId: '974578239414',
  appId: '1:974578239414:web:ae41aac204347839d92317',
};

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google, Github, and Email/Password as auth providers.
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore();

// Export FirebaseUI signin screen
export function SignInScreen() {
  return (
    <div>
      <h1>Sign in</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

// Function to handle email/password registration
export async function registerWithEmailAndPassword(email, password) {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    // You can do something with the userCredential, like logging the user in
    console.log('User registered:', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}
