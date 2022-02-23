import React from 'react';
import Dashboard from './Dashboard';
import '../../src/styles/main.css';
import '../../src/styles/darkmode.css';

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