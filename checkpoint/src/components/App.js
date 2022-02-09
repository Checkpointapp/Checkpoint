import React from 'react';
import Dashboard from './Dashboard';
import '../../src/styles/main.css';
import Calendar from './Calendar';

const style = {
  position: "relative",
  margin: "50px auto"
}

class App extends React.Component {

  render() {
    return (
      <>
      <div className="main">
        <Dashboard></Dashboard>
        <Calendar style={style} width= "302px" />
      </div>
      </>
    )
  }

}

export default App;