import '../styles/main.css';
import '../styles/resources.css';
import firebase from "firebase/app";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Resources(props) {

  function convertDate(UTCSec) {
    var d = new Date(0);
    d.setUTCSeconds(UTCSec);
    d.setHours(d.getHours() - d.getTimezoneOffset() / 60);
    return (d).toLocaleString();
  }

  function deleteTask() {
    if (window.confirm("Are you sure to want to delete this task? ")) {
      var userId = firebase.auth().currentUser.uid;
      console.log("users/" + userId + "/lists/" + props.listSec + "_list" + "/tasks" + props.date);
      var ref = firebase.database().ref("users/" + userId + "/lists/" + props.listSec + "_list" + "/tasks/" + props.date); //still not workiing?
      ref.remove();
    }
  }

  return (
    <>
      <div className="task-card">
        <div className='task-background'>
          <div className="delete-button">
            <FontAwesomeIcon icon={faXmark} onClick={deleteTask} />
          </div>
          <h2 className="task-text">{props.text}</h2>
          {/*<h4 className="task-time">{convertDate(props.date)}</h4>*/}
        </div>
      </div>
    </>

  );
}

export default Resources;