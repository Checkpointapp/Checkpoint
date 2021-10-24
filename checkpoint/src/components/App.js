import React from 'react';
import AuthContext from '../contexts/AuthContext';
import MainNavbar from './MainNavbar'
import HeroTitleDescription from './HeroTitleDescription';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from './Dashboard';

class App extends React.Component {

  render() {
    return (
      <>

      <Dashboard></Dashboard>

      </>
    )
  }

}

export default App;