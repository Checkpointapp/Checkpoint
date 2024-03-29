import '../styles/main.css';
import '../styles/tasks.css';
import firebase from "firebase/app";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Tasks(props) {

  function deleteTask() {
    if (window.confirm("Are you sure to want to delete this task? ")) {
      var userId = firebase.auth().currentUser.uid;
      console.log("users/" + userId + "/lists/" + props.listSec + "_list/tasks" + props.date);
      var ref = firebase.database().ref("users/" + userId + "/lists/" + props.listSec + "_list/tasks/" + props.date); //still not workiing?
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
        </div>
      </div>
    </>

  );
}

export default Tasks;