import '../styles/main.css';
import '../styles/tasks.css';
import firebase from "firebase/app";
import { Button } from 'react-bootstrap';

function Tasks(props) {

    function convertDate(UTCSec) {
        var d = new Date(0);
        d.setUTCSeconds(UTCSec);
        d.setHours(d.getHours() - d.getTimezoneOffset() / 60);
        return (d).toLocaleString();
    }

    function deleteTask() {
        if(window.confirm("Are you sure to want to delete this task? ")){
            var userId = firebase.auth().currentUser.uid;
            console.log("users/" + userId + "/lists/" + props.listSec + "_list" + "/tasks" + props.date);
            var ref = firebase.database().ref("users/" + userId + "/lists/" + props.listSec + "_list" + "/tasks/" + props.date); //still not workiing?
            ref.remove();
        }
    }

    return (
      <>
        <div className="task-card">
          <h2 className="task-text">{props.text}</h2>
          {/*<h4 className="task-time">{convertDate(props.date)}</h4>*/}
          <br />
          <div className="delete-button">
            <Button onClick={deleteTask}>Delete</Button>
          </div>
          <br />
        </div>

      <br></br>
      </>
  
    );
}

export default Tasks;