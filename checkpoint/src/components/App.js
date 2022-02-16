import React from 'react';
import Dashboard from './Dashboard';
import '../../src/styles/main.css';
import Calendar from './Calendar';

const style = {
  position: "relative",
  margin: "50px auto"
}

class App extends React.Component {
  onDayClick = (e, day) => {
    alert(day);
  }
  render() {
    return (
      <>
      <div className="main">
        <Dashboard></Dashboard>
        <Calendar style={style} width= "302px" 
        oneDayClick={(e, day)=> this.onDayaClick(e,day)}/>

      </div>
      </>
    )
  }

}

export default App;