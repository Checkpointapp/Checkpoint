import React from "react"
import '../../src/styles/main.css';
import Calendar from './Calendar';

const style = {
  position: "relative",
  margin: "50px auto"
}

class MainPage extends React.Component {

  onDayClick = (e, day) => {
    alert(day);
  }

  render() {
    return (
      <>
        <h1 className="main-page-desc-logged-in">Welcome back! Let's get started.</h1>
        <h2 class="calendar-heading">Your calendar:</h2>
        <Calendar style={style} width="302px"
          oneDayClick={(e, day) => this.onDayaClick(e, day)} />
      </>
    )
  }
}

export default MainPage;