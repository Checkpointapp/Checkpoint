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

  async function HideLoading() {
    setTimeout(function () {
        try {
            let x = document.getElementsByClassName("ring-container");
            x[0].style.display = "none";
        } catch (error) {
            console.log("");
        }
    }, 750);
  }

  HideLoading();

  return (
      <>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </>
  );
}

export default AuthContext;