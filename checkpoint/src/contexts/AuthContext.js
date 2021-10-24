import React from 'react';
import { signInWithGoogle } from '../firebase';
import firebase from "firebase/app";
import GoogleButton from 'react-google-button'
import '../../src/styles/main.css'
import { StyledFirebaseAuth } from 'react-firebaseui';

function AuthContext() {
  const uiConfig = ({
      signInFlow: 'popup',
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID]
  });

  return (
      <>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </>
  );
}

export default AuthContext;