import React, { useState } from "react"
import MainNavbar from "./MainNavbar"
import HeroTitleDescription from "./HeroTitleDescription"
import AuthContext from "../contexts/AuthContext"
import firebase from "firebase/app";
import { withRouter } from "react-router";
import Router from './Router'
import Loading from "./Loading";
import SurveyNotif from "./SurveyNotif";
import '../../src/styles/mainPage.css';

function Dashboard(props) {

  const [user, setUser] = useState(false);
  const [busy, setBusy] = useState(true);

  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
      setUser(true);
    } else {
      // User is signed out
      // ...
      setUser(false);
    }
    setBusy(false);
  });

  const logout = () => {
    firebase.auth().signOut().then(() => {
      props.history.push({
        pathname: "/"
      });
      window.location.reload();
    });
  }

  return (
    <>

      {user === false ?
        <>
          <div className="background">
            <Loading></Loading>
            <HeroTitleDescription></HeroTitleDescription>
            <AuthContext></AuthContext>
          </div>
        </>
        :
        <>
          <MainNavbar logout={logout}></MainNavbar>
          <div className="overlay-container">
            <SurveyNotif></SurveyNotif>
            <Router />
          </div>
        </>}

    </>
  )
}

export default withRouter(Dashboard);