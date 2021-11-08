//Fix the flashing problem -- example file doesn't do it, maybe css?

import React from 'react';
import Dashboard from './Dashboard';
import { withRouter } from "react-router-dom";
import '../../src/styles/main.css';

class App extends React.Component {



  render() {
    return (
      <>
      <div className="main">
        <Dashboard></Dashboard>
      </div>

      </>
    )
  }

}

export default App;