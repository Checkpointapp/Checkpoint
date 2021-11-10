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
            var ref = firebase.database().ref("users/" + userId + "/tasks/" + props.date);
            ref.remove();
        }
    }

    return (
      <>
        <b><h4>{convertDate(props.date)}</h4></b> 
        {props.text}
        <br/><br/>
        <Button onClick={deleteTask}>Delete</Button>
        <br></br>

      <br></br>
      </>
  
    );
}

export default Tasks;