import React from 'react';
//import './App.css';
import AuthContext from '../contexts/AuthContext';
import MainNavbar from './MainNavbar'

class App extends React.Component {

  render() {
    return (
      <>
      
      <MainNavbar></MainNavbar>
      <AuthContext></AuthContext>

      </>
    )
  }

}

export default App;